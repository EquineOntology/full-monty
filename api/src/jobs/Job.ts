import uuid from "uuid-mongodb";
import ConsoleLevel from "../types/ConsoleLevel";
import JobInterface from "../types/JobInterface";
import { JobStatus } from "../types/JobInterface";
import { update as storeInDb } from "../services/MongoConnector";

export default abstract class Job implements JobInterface {
  abstract name: string;
  abstract priority: number;
  abstract addedAt: Date;

  id: string;
  collection = "jobs";
  status: JobStatus = "pending";
  startedAt: Date | null = null;
  completedAt: Date | null = null;

  constructor() {
    this.id = uuid.v4().toString();
  }

  abstract dump(): {
    id: string;
    attributes: object;
    options?: object;
  };

  abstract handle(): void;

  onEnd() {
    this.#end();
  }

  onFail(error: Error) {
    this.#fail(error);
  }

  report(message: string, level: ConsoleLevel = "info"): void {
    console[level](`[job:${this.name}] ${message}`);
  }

  run(): void {
    this.#start();
    this.handle();
  }

  async store() {
    await storeInDb(this.collection, this.dump());
  }

  #end() {
    this.completedAt = new Date();
    this.status = "completed";
    this.store();
    this.report(`Completed at ${this.completedAt}`);
  }

  #fail(error: Error) {
    this.status = "failed";
    this.store();

    console.group(`[job:${this.name}] failed`);
    this.report(error.message, "error");
    if (error.stack) {
      console.log(error.stack);
    }
    console.groupEnd();
  }

  #start(): void {
    this.startedAt = new Date();
    this.status = "started";
    this.report(`Starting at ${this.startedAt}`);
  }
}
