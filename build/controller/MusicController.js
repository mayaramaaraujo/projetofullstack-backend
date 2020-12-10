"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicController = void 0;
const MusicBusiness_1 = require("../business/MusicBusiness");
class MusicController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMusic = {
                    token: req.headers.authorization,
                    title: req.body.title,
                    file: req.body.file,
                    genre: req.body.genre_id,
                    album: req.body.album
                };
                const musicBusiness = new MusicBusiness_1.MusicBusiness();
                yield musicBusiness.create(newMusic);
                res.status(200).send("Music created successfully");
            }
            catch (error) {
                res.status(400).send(error.message || error.sqlMessage);
            }
        });
    }
    getMusics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const musicBusiness = new MusicBusiness_1.MusicBusiness();
                const result = yield musicBusiness.getMusics(token);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message || error.sqlMessage);
            }
        });
    }
    getByAuthorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const author_id = req.params.author_id;
                const musicBusiness = new MusicBusiness_1.MusicBusiness();
                const result = yield musicBusiness.getMusicsByAuthorId(author_id, token);
                res.status(200).send(result);
            }
            catch (error) {
                let errorMessage;
                let errorCode;
                if (error.message.includes("jwt must be provided")) {
                    errorMessage = "Unauthorized user.";
                    errorCode = 401;
                }
                res.status(errorCode || 400).send(errorMessage || error.message || error.sqlMessage);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (!token) {
                    throw new Error("Insira um token");
                }
                const id = req.params.id;
                const musicBusiness = new MusicBusiness_1.MusicBusiness();
                yield musicBusiness.delete(id, token);
                res.status(200).send("Music deleted successfully.");
            }
            catch (error) {
                res.status(400).send(error.message || error.sqlMessage);
            }
        });
    }
}
exports.MusicController = MusicController;
//# sourceMappingURL=MusicController.js.map