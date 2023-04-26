"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// ...
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
app.use((0, cors_1.default)());
const login = {
    loggedin: false,
};
app.get("/", (req, res) => {
    res.status(200).json(login);
});
app.post("/logout", (req, res) => {
    login.loggedin = false;
    res.sendStatus(200);
});
app.post("/login", (req, res) => {
    login.loggedin = true;
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`⚡️ Server is running at http://localhost:${port} `);
});
