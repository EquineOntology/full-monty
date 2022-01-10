import cron, { ScheduledTask } from "node-cron";
import factory from "../factories/JobFactory";
import MigrateMarvinCsvToMongo from "../jobs/MigrateMarvinCsvToMongo";
import Queue from "../services/Queue";

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

const _scheduledJobs: Record<string, ScheduledTask> = {};

export default (queues: Record<number, Queue>) => {
  _jobs.forEach((jobDescription) => {
    if (!cron.validate(jobDescription.schedule)) {
      throw new Error(`[job:${jobDescription.name}] Invalid schedule`);
    }

    const job = factory(jobDescription.name, jobDescription.params);

    _scheduledJobs[jobDescription.name] = cron.schedule(
      jobDescription.schedule,
      () => {
        if (!queues[job.priority]) {
          throw new Error(`Queue with priority ${job.priority} not found.`);
        }

        queues[job.priority].push(job);
      }
    );
  });
};

export function stop(jobName: string) {
  if (!_scheduledJobs[jobName]) {
    console.error(`No scheduler job found with name "${jobName}"`);
    return;
  }

  _scheduledJobs[jobName].stop();
  delete _scheduledJobs[jobName];
}
