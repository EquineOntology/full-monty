declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      NEXTJS_PORT: number;
      NEXTJS_URL: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
