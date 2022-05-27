import fs from "fs";
import { parse } from "csv-parse";

export default class CsvParser {
  static parseFile(
    path: string,
    callback: (row: object) => void,
    onStreamClosed: () => void
  ) {
    fs.createReadStream(path)
      .pipe(parse({ columns: true }))
      .on("data", (row) => {
        callback(row);
      })
      .on("close", onStreamClosed);
  }
}
