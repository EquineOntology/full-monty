import cron from "node-cron";
import factory from "../factories/JobFactory";
import Queue from "../services/Queue";

export default (queues: Record<number, Queue>) => {
  const jobs = {
    TestJob: "* * * * *",
    // MigrateMarvinCsvToMongo: "* * * * *",
  };

  for (const [name, schedule] of Object.entries(jobs)) {
    if (!cron.validate(schedule)) {
      throw new Error(`[job:${name}] Invalid schedule`);
    }

    const job = factory(name);
    cron.schedule(schedule, () => {
      if (!queues[job.priority]) {
        throw new Error(`Queue with priority ${job.priority} not found.`);
      }

      queues[job.priority].push(job);
    });
  }
};
