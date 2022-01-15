import { Db as MongoDb, Document, MongoClient } from "mongodb";
import uuid from "uuid-mongodb";
import Model from "../models/Model";
import Job from "../jobs/Job";

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

export async function storeJob(input: Job) {
  await store(input.collection, input.dump());
}

export async function storeModel(input: Model) {
  const modelAttributes = { ...input.attributes };
  delete modelAttributes.id;

  await update(input.collection, modelAttributes, true);
}

export async function store(collectionName: string, input: object) {
  const collection = await getCollection(collectionName);

  await collection.insertOne(input);
}

export async function update(
  collectionName: string,
  input: Document,
  upsert: boolean = true
) {
  const collection = await getCollection(collectionName);
  const query = { _id: uuid.from(input.id) };
  const update = { $set: input };
  return await collection.updateOne(query, update, { upsert });
}

async function getCollection(name: string) {
  const collection = Db.collection(name);

  if (!collection) {
    const message = `Collection "${name}" not found in db "full-monty"`;
    throw new Error(message);
  }

  return collection;
}
