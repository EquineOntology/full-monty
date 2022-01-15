import ConsoleLevel from "./ConsoleLevel";

export default interface JobInterface {
  name: string;
  collection: string;
  status: JobStatus;
  addedAt: Date;
  startedAt: Date | null;
  completedAt: Date | null;

  handle: () => void;

  onEnd: () => void;

  report: (message: string, level: ConsoleLevel) => void;

  run: () => void;

  dump: () => object;
}

export type JobStatus = "pending" | "started" | "completed" | "failed";
