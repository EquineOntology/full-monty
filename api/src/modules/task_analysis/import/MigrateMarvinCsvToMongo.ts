import fs from "fs";
import path from "path";
import { MongoServerError } from "mongodb";
import Job from "../../arch/queues/Job";
import MarvinTask from "../data_management/MarvinTask";
import CsvParser from "../../../libs/CsvParser";
import { updateOrInsertModel } from "../../arch/database/MongoConnector";
import { index as getSettings } from "../import/ImportSettingsController";

type Options = {
  file: string;
};

export default class MigrateMarvinCsvToMongo extends Job {
  name = "MigrateMarvinCsvToMongo";
  priority = 1;
  addedAt: Date;
  #exclusionList: string[] = [];
  #file: string;
  #useEstimateWhenDurationMissing = false;

  constructor(options: Options) {
    super();
    this.addedAt = new Date();
    this.#file = options.file;
  }

  dump() {
    return {
      id: this.id,
      attributes: {
        name: this.name,
        status: this.status,
        priority: this.priority,
        addedAt: this.addedAt,
        startedAt: this.startedAt,
        completedAt: this.completedAt,
      },
      options: {
        file: this.#file,
        exclusionList: this.#exclusionList,
        useEstimateWhenDurationMissing: this.#useEstimateWhenDurationMissing,
      },
    };
  }

  async handle() {
    const { exclusionList, useEstimateWhenDurationMissing } =
      await getSettings();
    this.#exclusionList = exclusionList ?? [];
    this.#useEstimateWhenDurationMissing =
      useEstimateWhenDurationMissing ?? false;

    fs.access(this.#file, (err) => {
      if (err) {
        this.onFail(err);
        return;
      }

      CsvParser.parseFile(
        this.#file,
        this.#processTask.bind(this),
        this.onEnd.bind(this)
      );
    });
  }

  #deleteFile() {
    if (!this.#file) return;

    fs.unlink(this.#file, () => {
      console.info(`File "${path}" deleted`);
    });
  }

  onEnd() {
    this.#deleteFile;
    super.onEnd();
  }

  async #processTask(input: Record<string, any>) {
    const isNotDone = input.DONE !== "Y";
    const hasNoEstimate = !input.TIME_ESTIMATE || input.TIME_ESTIMATE === "0";
    if (isNotDone || hasNoEstimate) return;

    if (this.#exclusionList.includes(input.TITLE)) return;

    const hasDuration = input.DURATION !== null && input.DURATION !== "0";
    if (!this.#useEstimateWhenDurationMissing && !hasDuration) return;

    const duration = hasDuration ? input.DURATION : input.TIME_ESTIMATE;

    const store = {
      save: updateOrInsertModel,
    };

    const durationInSeconds = Math.round(parseInt(duration) / 1000);
    const estimateInSeconds = Math.round(parseInt(input.TIME_ESTIMATE) / 1000);
    const task = new MarvinTask(
      store,
      input.ID,
      input.TITLE,
      input.DONE,
      input.PATH,
      durationInSeconds,
      estimateInSeconds,
      durationInSeconds / estimateInSeconds
    );

    try {
      await task.save();
    } catch (e) {
      if (e instanceof MongoServerError) {
        if (e.code === 11000) return;
      }

      throw e;
    }
  }
}
