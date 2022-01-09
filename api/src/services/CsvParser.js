"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parse_1 = require("csv-parse");
const fs_1 = __importDefault(require("fs"));
class CsvParser {
    static parseFile(path, callback, onEnd) {
        fs_1.default.createReadStream(path)
            .pipe((0, csv_parse_1.parse)({ columns: true }))
            .on("data", (row) => {
            callback(row);
        })
            .on("end", onEnd);
    }
}
exports.default = CsvParser;
