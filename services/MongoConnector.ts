import { Db as MongoDb, MongoClient } from "mongodb";

export default class MongoConnector {
  client: MongoClient;

  constructor() {
    this.client = this.#createMongoClient();
    this.client.connect();
  }

  async close() {
    await this.client.close();
  }

  collection(database: string, collectionName: string) {
    const db = this.#getDb(database);
    return this.#getCollection(db, collectionName);
  }

  db(database: string) {
    return this.#getDb(database);
  }

  #createMongoClient() {
    const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}?retryWrites=true`;

    return new MongoClient(uri);
  }

  #getDb(database: string): MongoDb {
    return this.client.db(database);
  }

  #getCollection(db: MongoDb, collectionName: string) {
    return db.collection(collectionName);
  }
}

global.mongo = new MongoConnector();
