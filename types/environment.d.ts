declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      MONGO_SERVER: string;
      MONGO_PORT: number;
      MONGO_USER: string;
      MONGO_PASSWORD: string;
      MONGO_DATABASE: string;
    }
  }
}

export {};
