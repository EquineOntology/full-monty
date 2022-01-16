import Model from "../common/Model";

type Datastore = {
  save: (input: Model) => Promise<void>;
};

export default Datastore;
