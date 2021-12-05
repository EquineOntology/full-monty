import cron, { ScheduledTask } from "node-cron";

export default class Scheduler {
  jobs: { [id: string]: ScheduledTask } = {};

  createJob(id: string, job: any, schedule: string = "* * * * *") {
    if (!cron.validate(schedule)) {
      throw new Error(`[job:${id}] Invalid schedule`);
    }

    this.jobs[id] = cron.schedule(schedule, job);
    console.info(`[job:${id}] Scheduled`);
  }

  stopJob(id: string): boolean {
    if (!this.jobs[id]) {
      throw new Error(`[job:${id}] Not found, cannot stop`);
    }

    this.jobs[id].stop();
    delete this.jobs[id];

    console.info(`[job:${id}] Stopped`);

    return true;
  }
}
