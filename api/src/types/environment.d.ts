declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      NODE_ENV: "development" | "production" | "test";
      NODE_PORT: number;
    }
  }
}

export {};
