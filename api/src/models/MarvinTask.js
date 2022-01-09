"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
class MarvinTask extends Model_1.default {
    constructor(datastore, id, title, done, category, duration, time_estimate) {
        super(datastore);
        this.collection = "marvin_tasks";
        const categoryStructure = category.split("/");
        this.attributes = {
            id: id,
            title: title,
            done: done === "Y",
            project: categoryStructure[categoryStructure.length - 1],
            category: categoryStructure[0],
            duration: duration > 0 ? duration : null,
            estimate: time_estimate > 0 ? time_estimate : null,
        };
    }
}
exports.default = MarvinTask;
