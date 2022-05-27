export type ConsoleLevel = "log" | "info" | "warn" | "error";

export interface JobInterface {
  name: string;
  status: JobStatus;
  startedAt: Date | null;
  completedAt: Date | null;

  handle: () => void;

  end: () => void;

  report: (message: string, level: ConsoleLevel) => void;

  run: () => void;
}

export type JobStatus = "pending" | "started" | "completed" | "failed";
