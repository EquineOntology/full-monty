import Datastore from "@/datastore";
import Model from "@/models/Model";
import { ConsoleLevel, JobInterface, JobStatus } from "./types";

export default abstract class Job extends Model implements JobInterface {
  public abstract name: string;
  public abstract priority: number;

  table = "jobs";
  status: JobStatus = "pending";
  data: Record<string, any> | null = null;
  startedAt: Date | null = null;
  completedAt: Date | null = null;

  constructor(data?: Record<string, any>) {
    super();
    if (data) {
      this.data = data;
    }
  }

  abstract handle(): void;

  getAttributes(): Record<string, any> {
    return {
      ...super.getAttributes(),
      name: this.name,
      data: this.data,
      status: this.status,
      startedAt: this.startedAt,
      completedAt: this.completedAt,
    };
  }

  end() {
    this.#onEnd();
  }

  fail(error: Error) {
    this.#onFail(error);
  }

  report(message: string, level: ConsoleLevel = "info"): void {
    console[level](`[job:${this.name}] ${message}`);
  }

  run(): void {
    this.#onStart();
    this.handle();
  }

  #onEnd() {
    this.completedAt = new Date();
    this.status = "completed";
    this.save();
    this.report(`Completed at ${this.completedAt}`);
  }

  #onFail(error: Error) {
    this.status = "failed";
    this.completedAt = new Date();
    this.save();

    console.group(`[job:${this.name}] failed`);
    this.report(error.message, "error");
    if (error.stack) {
      console.log(error.stack);
    }
    console.groupEnd();
  }

  async #onStart() {
    this.startedAt = new Date();
    this.status = "started";
    await this.save();
    this.report(`Starting at ${this.startedAt}`);
  }

  static async clear() {
    await Datastore.clear("jobs");
  }
}
