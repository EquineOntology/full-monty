declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      NODE_PORT: number;
      WEBSITE_URL: string;
    }
  }
}

export {};
