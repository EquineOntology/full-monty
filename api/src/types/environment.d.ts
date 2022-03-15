declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_PASSWORD: string;
      MONGO_PORT: number;
      MONGO_SERVER: string;
      MONGO_USER: string;
      NODE_ENV: "development" | "production" | "test";
      NODE_PORT: number;
      WEBSITE_URL: string;
    }
  }
}

export {};
