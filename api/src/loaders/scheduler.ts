import cron, { ScheduledTask } from "node-cron";
import factory from "../factories/JobFactory";
import Queue from "../services/Queue";

const _jobs: JobConfiguration[] = [
  // { name: "TestJob", priority: 1, schedule: "* * * * *" },
];

const _scheduledJobs: Record<string, ScheduledTask> = {};

export default (queues: Record<number, Queue>) => {
  _jobs.forEach((jobConfig) => {
    if (!cron.validate(jobConfig.schedule)) {
      throw new Error(`[job:${jobConfig.name}] Invalid schedule`);
    }

    const job = factory(jobConfig.name, jobConfig.params);

    _scheduledJobs[jobConfig.name] = cron.schedule(jobConfig.schedule, () => {
      if (!queues[jobConfig.priority]) {
        throw new Error(`Queue with priority ${jobConfig.priority} not found.`);
      }

      queues[jobConfig.priority].push(job);
    });
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

type JobConfiguration = {
  name: string;
  schedule: string;
  priority: number;
  params: object;
};
