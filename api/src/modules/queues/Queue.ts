import Job from "./jobs/Job";
import createJob from "./JobFactory";
import { JobStatus } from "../../types/JobInterface";
import { get as getFromDb } from "../../services/MongoConnector";

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

  add(job: Job) {
    job.priority = this.priority;
    job.store();
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
    const filter: {
      "attributes.status": JobStatus;
      "attributes.priority": number;
    } = {
      "attributes.status": "pending",
      "attributes.priority": this.priority,
    };

    const sort = ["addedAt", "asc"];
    const results = await getFromDb("jobs", filter, sort);

    const jobs = [];
    results.forEach((jobData) => {
      const { id, options, attributes } = jobData;
      const job = createJob(attributes.name, options, attributes);
      job.id = id;
      this.#jobs.push(job);
    });

    console.info(`Queue #${this.priority} loaded ${this.size()} jobs from DB`);
  }
}
