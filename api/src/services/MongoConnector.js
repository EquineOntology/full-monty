"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.Client = exports.Db = void 0;
const mongodb_1 = require("mongodb");
exports.default = async () => {
    if (exports.Db)
        return exports.Db;
    const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}?retryWrites=true`;
    exports.Client = new mongodb_1.MongoClient(uri);
    exports.Client.connect();
    exports.Db = exports.Client.db("full-monty");
    return exports.Db;
};
async function save(input) {
    const collection = await getCollection(input.collection);
    const modelAttributes = { ...input.attributes };
    const query = { _id: modelAttributes.id };
    delete modelAttributes.id;
    const update = { $set: modelAttributes };
    await collection.updateOne(query, update, { upsert: true });
}
exports.save = save;
async function getCollection(name) {
    const collection = exports.Db.collection(name);
    if (!collection) {
        const message = `Collection "${name}" not found in db "full-monty"`;
        throw new Error(message);
    }
    return collection;
}
