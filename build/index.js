"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = require("./routes/userRouter");
const genreRouter_1 = require("./routes/genreRouter");
const musicRouter_1 = require("./routes/musicRouter");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/user", userRouter_1.userRouter);
app.use("/genre", genreRouter_1.genreRouter);
app.use("/music", musicRouter_1.musicRouter);
const server = app.listen(3003, () => {
    console.log("Server is running...");
});
//# sourceMappingURL=index.js.map