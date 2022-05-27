import type { Knex } from "knex";

const client = "better-sqlite3";
const migrations = {
  directory: "./src/migrations",
  tableName: "migrations",
  extension: "ts",
};

const config: Record<string, Knex.Config> = {
  development: {
    client: client,
    connection: {
      filename: "./database.sqlite",
    },
    debug: false,
    migrations: migrations,
    useNullAsDefault: true,
  },

  production: {
    client: client,
    connection: {
      filename: "./database.sqlite",
    },
    debug: false,
    migrations: migrations,
    useNullAsDefault: true,
  },

  test: {
    client: client,
    connection: {
      filename: "./database-test.sqlite",
    },
    debug: false,
    migrations: migrations,
    useNullAsDefault: true,
  },
};

export default config;
