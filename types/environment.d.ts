declare global {
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
