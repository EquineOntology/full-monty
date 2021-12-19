import fs from "fs";
import { MongoServerError } from "mongodb";
import MarvinTask from "../models/MarvinTask";
import CsvParser from "../services/CsvParser";
import Job from "./Job";
import { save as saveInMongo } from "../services/MongoConnector";

export default class MigrateMarvinCsvToMongo extends Job {
  id = "marvin-mongo";
  priority = 2;

  #dataDir = "data/";

  handle() {
    var files = this.#getFiles(this.#dataDir);
    if (!files) {
      this.report("No new files to migrate");
      return;
    }

    this.#readFile(`${this.#dataDir}${files[0]}`, this.#processTask);
  }

  #getFiles(directory: string): string[] | null {
    var files = fs.readdirSync(directory);

    if (!files) {
      return null;
    }

    files.sort(function (a, b) {
      return (
        fs.statSync(directory + a).mtime.getTime() -
        fs.statSync(directory + b).mtime.getTime()
      );
    });

    return files;
  }

  #readFile(path: string, callback: (row: object) => void) {
    CsvParser.parseFile(path, callback, this.onEnd.bind(this));
  }

  async #processTask(input: any) {
    if (
      !input.DURATION ||
      input.DURATION === "0" ||
      !input.TIME_ESTIMATE ||
      input.TIME_ESTIMATE === "0" ||
      input.DONE !== "Y"
    )
      return;

    const store = {
      save: saveInMongo,
    };
    const task = new MarvinTask(
      store,
      input.ID,
      input.TITLE,
      input.DONE,
      input.PATH,
      input.DURATION,
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
