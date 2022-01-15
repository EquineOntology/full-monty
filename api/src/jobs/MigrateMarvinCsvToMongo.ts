import fs from "fs";
import path from "path";
import { MongoServerError } from "mongodb";
import Job from "./Job";
import MarvinTask from "../models/MarvinTask";
import CsvParser from "../services/CsvParser";
import { storeModel } from "../services/MongoConnector";

type JobConfiguration = {
  useEstimateWhenDurationMissing: boolean;
  exclusionList: string[];
};

export default class MigrateMarvinCsvToMongo extends Job {
  priority = 1;
  added_at: Date;
  #exclusionList: string[];
  #filePath: string;
  #useEstimateWhenDurationMissing: boolean;

  constructor(filePath: string, config: JobConfiguration) {
    super();

    this.added_at = new Date();
    this.#filePath = filePath;
    this.#useEstimateWhenDurationMissing =
      config.useEstimateWhenDurationMissing;
    this.#exclusionList = config.exclusionList;
  }

  dump() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      priority: this.priority,
      added_at: this.added_at,
      started_at: this.started_at,
      completed_at: this.completed_at,

      file: this.#filePath,
    };
  }

  handle() {
    fs.access(this.#filePath, (err) => {
      if (err) {
        this.onFail(err);
        return;
      }

      CsvParser.parseFile(
        this.#filePath,
        this.#processTask.bind(this),
        this.onEnd.bind(this)
      );
    });
  }

  #deleteFile() {
    if (!this.#filePath) return;

    fs.unlink(this.#filePath, () => {
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
      save: storeModel,
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
