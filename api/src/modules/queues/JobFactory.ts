import Job from "./jobs/Job";
import MigrateMarvinCsvToMongo from "./jobs/MigrateMarvinCsvToMongo";
import TestJob from "./jobs/TestJob";

const classes = { TestJob, MigrateMarvinCsvToMongo };

export default (name: string, options?: object, attributes?: object): Job => {
  // See https://stackoverflow.com/a/38127705 for why <any> (CF 19.12.21).
  let job = new (<any>classes)[name](options);

  if (attributes) {
    job = Object.assign(job, attributes);
  }

  return job;
};
