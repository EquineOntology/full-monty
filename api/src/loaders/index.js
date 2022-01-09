"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const mongo_1 = __importDefault(require("./mongo"));
const scheduler_1 = __importDefault(require("./scheduler"));
const queues_1 = __importDefault(require("./queues"));
exports.default = async ({ expressApp }) => {
    await (0, mongo_1.default)();
    console.info("MongoDB Initialized");
    const queues = (0, queues_1.default)();
    console.info("Job queues initialized");
    (0, scheduler_1.default)(queues);
    console.info("Job scheduler initialized");
    const express = await (0, express_1.default)({ app: expressApp });
    console.info("Express Initialized");
    return {
        express,
        queues,
    };
};
