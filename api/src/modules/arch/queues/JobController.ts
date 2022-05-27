import Datastore from "@/datastore";
import { JobStatus } from "./types";

export async function index() {
  const list = await Datastore.get("jobs", {
    sort: [{ column: "createdAt", order: "desc" as "desc" }],
    limit: 10,
    returnFields: ["name", "status", "createdAt", "completedAt"],
  });

  const jobs: JobDataForClient[] = [];
  list.forEach((jobData) => {
    jobs.push({
      name: getFriendlyJobName(jobData.name),
      status: jobData.status,
      addedAt: jobData.createdAt,
      completedAt: jobData.completedAt,
    });
  });

  return jobs;
}

function getFriendlyJobName(jobName: string) {
  switch (jobName) {
    case "ImportTasksFromMarvin":
      return "Marvin CSV import";
    case "TestCronJob":
      return "Test";
    default:
      throw new Error(`Friendly job name of "${jobName}" not defined`);
  }
}

export default {
  index: index,
};

type JobDataForClient = {
  name: string;
  status: JobStatus;
  addedAt: Date | null;
  completedAt: Date | null;
};
