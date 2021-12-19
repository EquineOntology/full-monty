import { Db as MongoDb, MongoClient } from "mongodb";

let db: MongoDb;
export default async () => {
  if (db) return db;

  const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}?retryWrites=true`;

  const client = new MongoClient(uri);
  client.connect();

  db = client.db("full-monty");

  console.info("CONNECTED TO DB");

  return db;
};
