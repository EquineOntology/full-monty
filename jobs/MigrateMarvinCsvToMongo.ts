import Job from "./Job";

export default class MigrateMarvinCsvToMongo implements Job {
  id: string;
  data: unknown;

  constructor(id: string, data: unknown) {
    this.id = id;
    this.data = data;
  }

  run() {}
}
