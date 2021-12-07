import MongoConnector from "../services/MongoConnector";

declare global {
  var mongo: MongoConnector;
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      MONGO_SERVER: string;
      MONGO_PORT: number;
      MONGO_USER: string;
      MONGO_PASSWORD: string;
    }
  }
}

export {};
