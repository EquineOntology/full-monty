"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MigrateMarvinCsvToMongo_1 = __importDefault(require("../jobs/MigrateMarvinCsvToMongo"));
const TestJob_1 = __importDefault(require("../jobs/TestJob"));
const classes = { TestJob: TestJob_1.default, MigrateMarvinCsvToMongo: MigrateMarvinCsvToMongo_1.default };
exports.default = (name, parameters) => {
    // See https://stackoverflow.com/a/38127705 for why <any> (CF 19.12.21).
    return new classes[name](parameters);
};
