import knex, { Knex } from "knex";
import Model from "@/models/Model";
import config from "@/root/knexfile";
import { GetOptions } from "./types";
import { isObject, isPrimitive } from "@/utils/TypeChecker";

export default class SqliteConnector {
  #db: Knex;

  constructor() {
    const environment = process.env.NODE_ENV ?? "development";
    this.#db = knex(config[environment]);
  }

  async clear(table: string) {
    return await this.#db(table).truncate();
  }

  closeConnection() {
    return true;
  }

  async get(
    table: string,
    options?: GetOptions
  ): Promise<Record<string, any>[]> {
    const defaultOptions = { returnFields: "*" };
    options = options ? { ...defaultOptions, ...options } : defaultOptions;

    let query = this.#db(table);

    if (options.filter) {
      for (const column in options.filter) {
        const filterData = options.filter[column];

        if (isPrimitive(filterData)) {
          query = query.where(column, filterData);
        } else if (Array.isArray(filterData)) {
          query = query.whereIn(column, filterData);
        } else if (isObject(filterData)) {
          if ("between" in filterData) {
            query = query.whereBetween(column, filterData.between);
          } else if ("operator" in filterData) {
            query = query.where(column, filterData.operator, filterData.value);
          }
        } else {
          query = query.where(column, filterData);
        }
      }
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    return await query.select(options.returnFields!);
  }

  async remove(model: Model) {
    return await this.#db(model.table).where("id", model.id).del();
  }

  async save(model: Model) {
    const result = await this.#db<Model>(model.table)
      .insert(model.getAttributes(), "id")
      .onConflict("id")
      .merge();

    return result[0].id;
  }
}
