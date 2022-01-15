import { Db as MongoDb, Document, MongoClient, Sort } from "mongodb";
import Job from "../jobs/Job";
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

export async function get(
  collectionName: string,
  filter: object,
  sort: Sort
): Promise<Document[]> {
  let collection = null;
  try {
    collection = await getCollection(collectionName);
  } catch (error) {
    return [];
  }

  return await collection.find(filter, { sort: sort }).toArray();
}

export async function insertJob(input: Job) {
  await insert(input.collection, input.dump());
}

export async function updateOrInsertModel(input: Model) {
  const modelAttributes = { ...input.attributes };
  delete modelAttributes.id;

  await update(input.collection, modelAttributes, true);
}

export async function insert(collectionName: string, input: object) {
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
