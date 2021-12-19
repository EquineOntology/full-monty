import ConsoleLevel from "../types/ConsoleLevel";

export default class Job {
  id = "job";
  priority: number = 1;
  data: unknown;
  started_at: Date | null = null;
  ended_at: Date | null = null;

  constructor(data?: unknown) {
    this.data = data;
  }

  handle(): void {
    throw new Error(`[job:${this.id}] Handling logic has not been defined`);
  }

  onEnd() {
    this.#end();
  }

  report(message: string, level: ConsoleLevel = "info"): void {
    console[level](`[job:${this.id}] ${message}`);
  }

  run(): void {
    this.#start();
    this.handle();
  }

  #end() {
    this.ended_at = new Date();
    this.report(`Ended at ${this.ended_at}`);
  }

  #start(): void {
    this.started_at = new Date();
    this.report(`Starting at ${this.started_at}`);
  }
}
