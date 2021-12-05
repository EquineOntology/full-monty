import ConsoleLevel from "../types/ConsoleLevel";

export default class Job {
  id = "job";
  data: unknown;
  started_at: Date | null = null;
  ended_at: Date | null = null;

  constructor(data?: unknown) {
    this.data = data;
  }

  execute(): void {
    this.#start();
    this.handle();
    this.#end();
  }

  handle(): void {
    throw new Error(`[job:${this.id}] Handling logic has not been defined`);
  }

  #end() {
    this.ended_at = new Date();
    this.#log(`Ended at ${this.ended_at}`);
  }

  #log(message: string, level: ConsoleLevel = "info"): void {
    console[level](`[job:${this.id}] ${message}`);
  }

  #start(): void {
    this.started_at = new Date();
    this.#log(`Starting at ${this.started_at}`);
  }
}
