"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const loaders_1 = __importDefault(require("./loaders"));
async function startServer() {
    dotenv_1.default.config();
    const globals = await (0, loaders_1.default)({ expressApp: (0, express_1.default)() });
    const app = globals.express;
    app.get("/", async (req, res) => {
        return res.status(200).send({
            message: "Node is listening",
        });
    });
    const port = process.env.NODE_PORT;
    try {
        app.listen(port, () => {
            console.info(`Connected successfully on port ${port}`);
        });
    }
    catch (error) {
        console.error(`Error occured: ${error.message}`);
    }
}
startServer();
