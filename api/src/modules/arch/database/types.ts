import Model from "./models/Model";

export type Datastore = {
  save: (input: Model) => Promise<void>;
};
