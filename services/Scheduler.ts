import cron, { ScheduledTask } from "node-cron";
import Job from "../jobs/Job";

export default class Scheduler {
  jobs: { [id: string]: ScheduledTask } = {};

  dispatch(job: Job, schedule: string = "* * * * *") {
    if (!cron.validate(schedule)) {
      throw new Error(`[job:${job.id}] Invalid schedule`);
    }

    this.jobs[job.id] = cron.schedule(schedule, job.run.bind(job));
    console.info(`[job:${job.id}] Scheduled`);
  }

  stop(id: string): boolean {
    if (!this.jobs[id]) {
      throw new Error(`[job:${id}] Not found, cannot stop`);
    }

    this.jobs[id].stop();
    delete this.jobs[id];

    console.info(`[job:${id}] Stopped`);

    return true;
  }
}
