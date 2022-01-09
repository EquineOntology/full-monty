"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _MigrateMarvinCsvToMongo_instances, _MigrateMarvinCsvToMongo_dataDir, _MigrateMarvinCsvToMongo_exclusionList, _MigrateMarvinCsvToMongo_useEstimateWhenDurationMissing, _MigrateMarvinCsvToMongo_getFiles, _MigrateMarvinCsvToMongo_readFile, _MigrateMarvinCsvToMongo_processTask;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = require("mongodb");
const MarvinTask_1 = __importDefault(require("../models/MarvinTask"));
const CsvParser_1 = __importDefault(require("../services/CsvParser"));
const Job_1 = __importDefault(require("./Job"));
const MongoConnector_1 = require("../services/MongoConnector");
class MigrateMarvinCsvToMongo extends Job_1.default {
    constructor(config) {
        super();
        _MigrateMarvinCsvToMongo_instances.add(this);
        this.id = "marvin-mongo";
        this.priority = 2;
        _MigrateMarvinCsvToMongo_dataDir.set(this, "data/");
        _MigrateMarvinCsvToMongo_exclusionList.set(this, void 0);
        _MigrateMarvinCsvToMongo_useEstimateWhenDurationMissing.set(this, void 0);
        __classPrivateFieldSet(this, _MigrateMarvinCsvToMongo_useEstimateWhenDurationMissing, config.useEstimateWhenDurationMissing, "f");
        __classPrivateFieldSet(this, _MigrateMarvinCsvToMongo_exclusionList, config.exclusionList, "f");
    }
    handle() {
        var files = __classPrivateFieldGet(this, _MigrateMarvinCsvToMongo_instances, "m", _MigrateMarvinCsvToMongo_getFiles).call(this, __classPrivateFieldGet(this, _MigrateMarvinCsvToMongo_dataDir, "f"));
        console.log(files);
        if (!files) {
            this.report("No new files to migrate");
            return;
        }
        __classPrivateFieldGet(this, _MigrateMarvinCsvToMongo_instances, "m", _MigrateMarvinCsvToMongo_readFile).call(this, `${__classPrivateFieldGet(this, _MigrateMarvinCsvToMongo_dataDir, "f")}${files[0]}`, __classPrivateFieldGet(this, _MigrateMarvinCsvToMongo_instances, "m", _MigrateMarvinCsvToMongo_processTask).bind(this));
    }
}
exports.default = MigrateMarvinCsvToMongo;
_MigrateMarvinCsvToMongo_dataDir = new WeakMap(), _MigrateMarvinCsvToMongo_exclusionList = new WeakMap(), _MigrateMarvinCsvToMongo_useEstimateWhenDurationMissing = new WeakMap(), _MigrateMarvinCsvToMongo_instances = new WeakSet(), _MigrateMarvinCsvToMongo_getFiles = function _MigrateMarvinCsvToMongo_getFiles(directory) {
    var files = fs_1.default.readdirSync(directory);
    if (!files) {
        return null;
    }
    const extension = ".csv";
    const csvFiles = files.filter((file) => {
        return path_1.default.extname(file).toLowerCase() === extension;
    });
    csvFiles.sort(function (a, b) {
        return (fs_1.default.statSync(directory + a).mtime.getTime() -
            fs_1.default.statSync(directory + b).mtime.getTime());
    });
    return csvFiles;
}, _MigrateMarvinCsvToMongo_readFile = function _MigrateMarvinCsvToMongo_readFile(path, callback) {
    CsvParser_1.default.parseFile(path, callback, this.onEnd.bind(this));
}, _MigrateMarvinCsvToMongo_processTask = async function _MigrateMarvinCsvToMongo_processTask(input) {
    const isNotDone = input.DONE !== "Y";
    const hasNoEstimate = !input.TIME_ESTIMATE || input.TIME_ESTIMATE === "0";
    if (isNotDone || hasNoEstimate)
        return;
    if (__classPrivateFieldGet(this, _MigrateMarvinCsvToMongo_exclusionList, "f").includes(input.TITLE))
        return;
    const hasDuration = input.DURATION !== null && input.DURATION !== "0";
    if (!__classPrivateFieldGet(this, _MigrateMarvinCsvToMongo_useEstimateWhenDurationMissing, "f") && !hasDuration)
        return;
    const duration = hasDuration ? input.DURATION : input.TIME_ESTIMATE;
    const store = {
        save: MongoConnector_1.save,
    };
    const task = new MarvinTask_1.default(store, input.ID, input.TITLE, input.DONE, input.PATH, duration, input.TIME_ESTIMATE);
    try {
        await task.save();
    }
    catch (e) {
        if (e instanceof mongodb_1.MongoServerError) {
            if (e.code === 11000)
                return;
        }
        throw e;
    }
};
