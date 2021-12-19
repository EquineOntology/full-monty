import Model from "../models/Model";

type Datastore = {
  save: (input: Model) => Promise<void>;
};

export default Datastore;
