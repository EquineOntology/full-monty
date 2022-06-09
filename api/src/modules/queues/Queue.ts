import Datastore from "@/datastore";
import Job from "./Job";
import createJob from "./JobFactory";

export default class Queue {
  priority: number;
  #jobs: Job[] = [];

  constructor(priority: number) {
    this.priority = priority;
    this.load();
  }

  dump() {
    // TODO: Implement queue dump mechanism;
    console.error("Queue.dump not implemented");
  }

  size() {
    return this.#jobs.length;
  }

  async add(job: Job) {
    job.priority = this.priority;
    await job.save();
  }

  work() {
    if (this.size() === 0) return;
    const job = this.#jobs.pop();

    if (!job) return;

    try {
      job.run();
    } catch (e) {
      console.error(e);
    }
  }

  async load() {
    const results = await Datastore.get("jobs", {
      sort: [{ column: "createdAt", order: "asc" as "asc" }],
      filter: {
        status: ["pending", "started"],
        priority: this.priority,
      },
    });

    const jobs = [];
    results.forEach((jobData) => {
      const { name, data } = jobData;
      const job = createJob(name, data, jobData);
      this.#jobs.push(job);
    });

    console.info(`Queue #${this.priority} loaded ${this.size()} jobs from DB`);
  }
}
