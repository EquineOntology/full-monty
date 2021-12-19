import Job from "../jobs/Job";
import MigrateMarvinCsvToMongo from "../jobs/MigrateMarvinCsvToMongo";
import TestJob from "../jobs/TestJob";

const classes = { TestJob, MigrateMarvinCsvToMongo };

export default (name: string, parameters?: object): Job => {
  // See https://stackoverflow.com/a/38127705 for why <any> (CF 19.12.21).
  return new (<any>classes)[name](parameters);
};
