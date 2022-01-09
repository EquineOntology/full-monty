"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = __importDefault(require("../services/Queue"));
exports.default = () => {
    const queues = {};
    for (let priority = 1; priority <= 3; priority++) {
        queues[priority] = new Queue_1.default(priority);
    }
    // Ideally we would fire an event when adding a job so that the queue handler can check
    // if any other jobs are already in progress, and also fire an event when each job has
    // been completed to start the next one. For now it's overkill (CF 19.12.21).
    setInterval(function () {
        processQueues(queues);
    }, 1000);
    return queues;
};
function processQueues(queues) {
    for (let priority = 1; priority <= 3; priority++) {
        const queue = queues[priority];
        if (queue.size() === 0)
            continue;
        console.info(`Processing queue #${priority}: ${queue.size()} job(s) found`);
        queue.work();
        break;
    }
}
