import { Db, MongoClient } from "mongodb";

export default class MongoConnection {
  client: MongoClient;
  db: Db | null = null;

  constructor() {
    const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}?retryWrites=true`;
    this.client = new MongoClient(uri);
  }

  async connect(database: string | undefined) {
    if (!database) {
      throw new Error(
        "Database name passed to MongoConnection.connect must be a valid string"
      );
    }
    await this.client.connect();
    this.db = this.client.db(database);
  }

  async close() {
    await this.client.close();
  }
}
