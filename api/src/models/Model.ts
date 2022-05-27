import Datastore from "@/datastore";

export default abstract class Model {
  declare table: string;

  declare id: number | string;
  declare updatedAt: Date;
  declare createdAt: Date;

  constructor() {
    this.createdAt = new Date();
  }

  async save() {
    if (this.updatedAt) {
      this.updatedAt = new Date();
    }
    const result = await Datastore.save(this);
    this.id = Array.isArray(result) ? result[0] : result;
  }

  async delete() {
    await Datastore.remove(this);
  }

  getAttributes(): Record<string, any> {
    return {
      id: this.id,
      createdAt: this.createdAt,
    };
  }
}
