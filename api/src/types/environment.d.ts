declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly API_KEY: string;
      readonly MARVIN_FULL_ACCESS_TOKEN: string;
      readonly NODE_ENV: "development" | "production" | "test";
      readonly NODE_PORT: number;
      readonly SENTRY_SDN: string;
    }
  }
}

export {};
