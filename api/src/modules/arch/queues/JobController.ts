import { get as getFromDb } from "../database/MongoConnector";
import { JobStatus } from "./types";

export async function index() {
  const sort = ["addedAt", "desc"];
  const resultLimit = 10;
  const desiredFields = {
    "attributes.name": true,
    "attributes.status": true,
    "attributes.addedAt": true,
    "attributes.completedAt": true,
  };
  const list = await getFromDb("jobs", undefined, {
    sort: sort,
    limit: resultLimit,
    fieldFilter: desiredFields,
  });

  const jobs: JobDataForClient[] = [];
  list.forEach((job) => {
    jobs.push({
      name: getFriendlyJobName(job.attributes.name),
      status: job.attributes.status,
      addedAt: job.attributes.addedAt,
      completedAt: job.attributes.completedAt,
    });
  });

  return jobs;
}

function getFriendlyJobName(jobName: string) {
  switch (jobName) {
    case "MigrateMarvinCsvToMongo":
      return "Marvin CSV import";
    case "TestJob":
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
