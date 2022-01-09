"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("./Job"));
class TestJob extends Job_1.default {
    constructor() {
        super(...arguments);
        this.id = "test-job";
        this.priority = 1;
    }
    handle() {
        console.log("Task is running every minute " + new Date());
    }
}
exports.default = TestJob;
