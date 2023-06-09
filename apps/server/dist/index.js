"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
// TODO: implement more security by only allowing http://localhost:3000
app.use((0, cors_1.default)());
const login = {
    loggedin: false,
};
;
// app.set('trust proxy', 1) // trust first proxy
app.use((0, cookie_session_1.default)({
    name: 'session',
    secret: "password123",
    signed: false
}));
app.get('/', function (req, res, next) {
    var _a;
    // Set session to a random number
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.id))
        req.session = {
            id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
        };
    next();
});
app.get("/", (req, res) => {
    var _a;
    console.log(`The session object id is ${(_a = req.session) === null || _a === void 0 ? void 0 : _a.id}`);
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
