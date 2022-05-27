import { Knex } from "knex";
import { JobStatus } from "../modules/arch/queues/types";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("jobs", function (table) {
    table.integer("id").primary();
    table.string("name").notNullable();
    table.tinyint("priority").defaultTo(1);
    const statuses: JobStatus[] = ["pending", "started", "completed", "failed"];
    table.enum("status", statuses).notNullable().index();
    table.json("data").nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("startedAt").nullable();
    table.timestamp("completedAt").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("jobs");
}
