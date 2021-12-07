export default class Model {
  attributes: object = {};
  database = "database";
  collection = "collection";

  async save() {
    try {
      const collection = await this.#getCollection();
      await collection.insertOne(this.attributes);
    } catch (e) {
      console.error(e);
    } finally {
      global.mongo.close();
    }
  }

  async #getCollection() {
    const collection = global.mongo.client
      .db(this.database)
      .collection(this.collection);

    if (!collection) {
      const message = `Collection "${this.collection}" not found in db "${this.database}"`;
      throw new Error(message);
    }

    return collection;
  }
}
