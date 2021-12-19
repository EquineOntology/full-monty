import cron, { ScheduledTask } from "node-cron";
import factory from "../factories/JobFactory";
import Queue from "../services/Queue";

const _jobs = {
  // TestJob: "* * * * *",
  MigrateMarvinCsvToMongo: "0 0 * * *",
};

const _scheduledJobs: Record<string, ScheduledTask> = {};

export default (queues: Record<number, Queue>) => {
  for (const [name, schedule] of Object.entries(_jobs)) {
    if (!cron.validate(schedule)) {
      throw new Error(`[job:${name}] Invalid schedule`);
    }

    const job = factory(name);

    _scheduledJobs[name] = cron.schedule(schedule, () => {
      if (!queues[job.priority]) {
        throw new Error(`Queue with priority ${job.priority} not found.`);
      }

      queues[job.priority].push(job);
    });
  }
};

export function stop(jobName: string) {
  if (!_scheduledJobs[jobName]) {
    console.error(`No scheduler job found with name "${jobName}"`);
    return;
  }

  _scheduledJobs[jobName].stop();
  delete _scheduledJobs[jobName];
}
