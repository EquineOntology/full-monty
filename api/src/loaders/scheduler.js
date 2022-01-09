"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const JobFactory_1 = __importDefault(require("../factories/JobFactory"));
const MigrateMarvinCsvToMongo_1 = __importDefault(require("../jobs/MigrateMarvinCsvToMongo"));
const _jobs = [
    // { name: "TestJob", schedule: "* * * * *" },
    {
        name: "MigrateMarvinCsvToMongo",
        schedule: "0 0 * * *",
        // TODO: Allow setting params from external config.
        params: {
            useEstimateWhenDurationMissing: false,
            exclusionList: ["LB support"],
        },
    },
];
const _scheduledJobs = {};
exports.default = (queues) => {
    _jobs.forEach((jobDescription) => {
        if (!node_cron_1.default.validate(jobDescription.schedule)) {
            throw new Error(`[job:${jobDescription.name}] Invalid schedule`);
        }
        const job = (0, JobFactory_1.default)(jobDescription.name, jobDescription.params);
        _scheduledJobs[jobDescription.name] = node_cron_1.default.schedule(jobDescription.schedule, () => {
            if (!queues[job.priority]) {
                throw new Error(`Queue with priority ${job.priority} not found.`);
            }
            queues[job.priority].push(job);
        });
    });
    queues[1].push(new MigrateMarvinCsvToMongo_1.default(_jobs[0].params));
};
function stop(jobName) {
    if (!_scheduledJobs[jobName]) {
        console.error(`No scheduler job found with name "${jobName}"`);
        return;
    }
    _scheduledJobs[jobName].stop();
    delete _scheduledJobs[jobName];
}
exports.stop = stop;
