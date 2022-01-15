import Job from "../jobs/Job";

export default class Queue {
  priority: number;
  #jobs: Job[] = [];

  constructor(priority: number) {
    this.priority = priority;
    this.#load();
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

  #load() {
    // TODO: Implement queue load mechanism.
    console.error("Queue.#load not implemented");
  }
}
