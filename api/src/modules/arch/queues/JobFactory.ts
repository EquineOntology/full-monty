import Job from "./Job";
import MigrateMarvinCsvToMongo from "../../task_management/MigrateMarvinCsvToMongo";
import TestJob from "./TestJob";

const classes = { TestJob, MigrateMarvinCsvToMongo };

export default (name: string, options?: object, attributes?: object): Job => {
  // See https://stackoverflow.com/a/38127705 for why <any> (CF 19.12.21).
  let job = new (<any>classes)[name](options);

  if (attributes) {
    job = Object.assign(job, attributes);
  }

  return job;
};
