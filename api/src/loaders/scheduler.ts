import cron, { ScheduledTask } from "node-cron";
import factory from "../factories/JobFactory";
import Queue from "../services/Queue";

const _jobs: JobSpecification[] = [
  // { name: "TestJob", schedule: "* * * * *" },
];

const _scheduledJobs: Record<string, ScheduledTask> = {};

export default (queues: Record<number, Queue>) => {
  _jobs.forEach((jobConfig) => {
    if (!cron.validate(jobConfig.schedule)) {
      throw new Error(`[job:${jobConfig.name}] Invalid schedule`);
    }

    const job = factory(jobConfig.name, jobConfig.params);

    _scheduledJobs[jobConfig.name] = cron.schedule(jobConfig.schedule, () => {
      if (!queues[job.priority]) {
        throw new Error(`Queue with priority ${job.priority} not found.`);
      }

      queues[job.priority].add(job);
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

type JobSpecification = {
  name: string;
  schedule: string;
  params: object;
};
