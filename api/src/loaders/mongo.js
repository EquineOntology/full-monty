"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoConnector_1 = __importDefault(require("../services/MongoConnector"));
exports.default = () => {
    return (0, MongoConnector_1.default)();
};
