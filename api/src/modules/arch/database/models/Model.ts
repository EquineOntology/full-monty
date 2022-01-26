import { Datastore } from "../types";

export default class Model {
  attributes: Record<string, any> = {};
  database = "full-monty";
  collection = "collection";
  save;

  constructor(store: Datastore) {
    this.save = () => {
      store.save(this);
    };
  }
}
