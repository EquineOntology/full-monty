import uuid from "uuid-mongodb";
import ConsoleLevel from "../types/ConsoleLevel";
import JobInterface from "../types/JobInterface";
import { JobStatus } from "../types/JobInterface";
import { update as storeInDb } from "../services/MongoConnector";

export default abstract class Job implements JobInterface {
  abstract name: string;
  abstract priority: number;
  abstract added_at: Date;

  id: string;
  collection = "jobs";
  status: JobStatus = "pending";
  started_at: Date | null = null;
  completed_at: Date | null = null;

  constructor() {
    this.id = uuid.v4().toString();
  }

  abstract dump(): object;

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
    this.completed_at = new Date();
    this.status = "completed";
    this.store();
    this.report(`Completed at ${this.completed_at}`);
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
    this.started_at = new Date();
    this.status = "started";
    this.report(`Starting at ${this.started_at}`);
  }
}
