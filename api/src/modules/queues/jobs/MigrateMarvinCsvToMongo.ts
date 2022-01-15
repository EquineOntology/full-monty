import fs from "fs";
import path from "path";
import { MongoServerError } from "mongodb";
import Job from "./Job";
import MarvinTask from "../../task_manager/MarvinTask";
import CsvParser from "../../../services/CsvParser";
import { updateOrInsertModel } from "../../../services/MongoConnector";

type Options = {
  file: string;
  exclusionList: string[];
  useEstimateWhenDurationMissing: boolean;
};

export default class MigrateMarvinCsvToMongo extends Job {
  name = "MigrateMarvinCsvToMongo";
  priority = 1;
  addedAt: Date;
  #exclusionList: string[];
  #file: string;
  #useEstimateWhenDurationMissing: boolean;

  constructor(options: Options) {
    super();

    this.addedAt = new Date();

    this.#file = options.file;
    this.#exclusionList = options.exclusionList;
    this.#useEstimateWhenDurationMissing =
      options.useEstimateWhenDurationMissing;
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

  handle() {
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

  async #processTask(input: any) {
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
    const task = new MarvinTask(
      store,
      input.ID,
      input.TITLE,
      input.DONE,
      input.PATH,
      duration,
      input.TIME_ESTIMATE
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
