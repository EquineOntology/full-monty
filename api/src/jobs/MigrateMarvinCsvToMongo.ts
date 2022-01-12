import fs from "fs";
import path from "path";
import { MongoServerError } from "mongodb";
import MarvinTask from "../models/MarvinTask";
import CsvParser from "../services/CsvParser";
import Job from "./Job";
import { save as saveInMongo } from "../services/MongoConnector";

type JobConfiguration = {
  useEstimateWhenDurationMissing: boolean;
  exclusionList: string[];
};
export default class MigrateMarvinCsvToMongo extends Job {
  id = "marvin-mongo";
  priority = 2;

  #dataDir = "temp/";
  #exclusionList: string[];
  #selectedFile: string | null = null;
  #useEstimateWhenDurationMissing: boolean;

  constructor(config: JobConfiguration) {
    super();

    this.#useEstimateWhenDurationMissing =
      config.useEstimateWhenDurationMissing;
    this.#exclusionList = config.exclusionList;
  }

  handle() {
    var files = this.#getFiles(this.#dataDir);
    if (!files) {
      this.report("No new files to migrate");
      return;
    }

    this.#selectedFile = files[0];
    this.report(`Found file to migrate: ${this.#selectedFile}`);
    this.#readFile(this.#processTask.bind(this));
  }

  #getFiles(directory: string): string[] | null {
    var files = fs.readdirSync(directory);

    if (files.length === 0) {
      return null;
    }

    const extension = ".csv";

    const csvFiles = files.filter((file) => {
      return path.extname(file).toLowerCase() === extension;
    });

    csvFiles.sort(function (a, b) {
      return (
        fs.statSync(directory + a).mtime.getTime() -
        fs.statSync(directory + b).mtime.getTime()
      );
    });

    return csvFiles;
  }

  #deleteFile() {
    if (!this.#selectedFile) return;

    const filePath = path.join(this.#dataDir, this.#selectedFile);
    fs.unlink(filePath, () => {
      console.info(`File "${path}" deleted`);
    });
  }

  #readFile(callback: (row: object) => void) {
    if (!this.#selectedFile) return;

    const filePath = path.join(this.#dataDir, this.#selectedFile);
    CsvParser.parseFile(filePath, callback, this.onEnd.bind(this));
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
      save: saveInMongo,
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
