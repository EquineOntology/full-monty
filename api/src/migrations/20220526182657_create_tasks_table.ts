import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tasks", function (table) {
    table.string("id").primary();
    table.string("title").notNullable();
    table.boolean("done").notNullable();
    table.string("category").nullable();
    table.string("project").nullable();
    table.integer("duration").nullable();
    table.integer("estimate").nullable();
    table.integer("original_estimate").nullable();
    table.integer("ratio").nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updatedAt").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tasks");
}
