"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    constructor(store) {
        this.attributes = {};
        this.database = "full-monty";
        this.collection = "collection";
        this.save = () => {
            store.save(this);
        };
    }
}
exports.default = Model;
