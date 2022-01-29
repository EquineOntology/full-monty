import { Db as MongoDb, Document, MongoClient, Sort } from "mongodb";
import Job from "../queues/Job";
import Model from "./models/Model";

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

export async function clearCollection(collectionName: string) {
  let collection = null;
  try {
    collection = await getCollection(collectionName);
  } catch (error) {
    return;
  }

  const result = await collection.deleteMany({});
  return result.acknowledged;
}

type MongoGetOptions = {
  sort?: Sort;
  limit?: number;
  fieldFilter?: Record<string, boolean>;
};
export async function get(
  collectionName: string,
  filter: object = {},
  options?: MongoGetOptions
): Promise<Document[]> {
  let collection = null;
  try {
    collection = await getCollection(collectionName);
  } catch (error) {
    return [];
  }

  const findOptions = {
    sort: options?.sort,
    limit: options?.limit,
    projection: options?.fieldFilter,
  };

  return await collection.find(filter, findOptions).toArray();
}

export async function insertJob(input: Job) {
  await insert(input.collection, input.dump());
}

export async function updateOrInsertModel(input: Model) {
  await update(input.collection, input.attributes, true);
}

export async function insert(collectionName: string, input: object) {
  const collection = await getCollection(collectionName);

  const result = await collection.insertOne(input);
  return result.acknowledged;
}

export async function update(
  collectionName: string,
  input: Document,
  upsert: boolean = true
) {
  const collection = await getCollection(collectionName);
  const query = { taskId: input.taskId };
  const update = { $set: input };
  return await collection.updateOne(query, update, { upsert });
}

export async function close() {
  try {
    await Client.close();
  } catch (e) {
    return false;
  }
  return true;
}

async function getCollection(name: string) {
  const collection = Db.collection(name);

  if (!collection) {
    const message = `Collection "${name}" not found in db "full-monty"`;
    throw new Error(message);
  }

  return collection;
}