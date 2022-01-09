import { Db as MongoDb, MongoClient } from "mongodb";
import Model from "../models/Model";

export let Db: MongoDb;
export let Client: MongoClient;

export default async () => {
  if (Db) return Db;

  const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}?retryWrites=true`;

  Client = new MongoClient(uri);
  Client.connect();

  Db = Client.db("full-monty");
  return Db;
};

export async function save(input: Model) {
  const collection = await getCollection(input.collection);

  const modelAttributes = { ...input.attributes };

  const query = { _id: modelAttributes.id };
  delete modelAttributes.id;
  const update = { $set: modelAttributes };

  await collection.updateOne(query, update, { upsert: true });
}

async function getCollection(name: string) {
  const collection = Db.collection(name);

  if (!collection) {
    const message = `Collection "${name}" not found in db "full-monty"`;
    throw new Error(message);
  }

  return collection;
}
