import ConsoleLevel from "./ConsoleLevel";

export default interface JobInterface {
  name: string;
  collection: string;
  status: JobStatus;
  added_at: Date;
  started_at: Date | null;
  completed_at: Date | null;

  handle: () => void;

  onEnd: () => void;

  report: (message: string, level: ConsoleLevel) => void;

  run: () => void;

  dump: () => object;
}

export type JobStatus = "pending" | "started" | "completed" | "failed";
