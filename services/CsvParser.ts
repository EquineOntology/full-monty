import { parse } from "csv-parse";
import fs from "fs";

export default class CsvParser {
  static parseFile(
    path: string,
    callback: (row: object) => void,
    onEnd: () => void
  ) {
    fs.createReadStream(path)
      .pipe(parse({ columns: true }))
      .on("data", (row) => {
        callback(row);
      })
      .on("end", onEnd);
  }
}
