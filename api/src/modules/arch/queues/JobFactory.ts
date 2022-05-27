import Job from "./Job";
import * as classes from "@/models/jobs";

export default (name: string, options?: object, attributes?: object): Job => {
  // See https://stackoverflow.com/a/38127705 for why <any> (CF 19.12.21).
  const job = (<any>classes)[name].hydrate(attributes, options);

  return job;
};
