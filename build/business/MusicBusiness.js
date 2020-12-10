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
exports.MusicBusiness = void 0;
const MusicDatabase_1 = require("../data/MusicDatabase");
const InvalidInputError_1 = require("../error/InvalidInputError");
const UnauthorizedError_1 = require("../error/UnauthorizedError");
const Music_1 = require("../model/Music");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
class MusicBusiness {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenData = new Authenticator_1.Authenticator();
                const author = tokenData.getData(input.token);
                const idGenerator = new IdGenerator_1.IdGenerator();
                const id = idGenerator.generate();
                if (!input.title ||
                    !input.file ||
                    !input.album ||
                    !input.genre ||
                    !input.token) {
                    throw new InvalidInputError_1.InvalidInputError("Fill in all fields.");
                }
                const day = new Date().getDate();
                const month = new Date().getMonth();
                const year = new Date().getFullYear();
                const date = `${day}-${month}-${year}`;
                const newMusic = new Music_1.Music(id, input.title, author.id, date, input.file, input.genre, input.album);
                const musicDatabase = new MusicDatabase_1.MusicDatabase();
                yield musicDatabase.create(newMusic);
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    getMusics(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenData = new Authenticator_1.Authenticator();
                const author = tokenData.getData(token);
                if (!author) {
                    throw new Error("Invalid author");
                }
                const musicDatabase = new MusicDatabase_1.MusicDatabase();
                const result = yield musicDatabase.getMusics(author.id);
                if (!result) {
                    throw new Error("Invalid id. Musics not found.");
                }
                return result;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    getMusicsByAuthorId(author_id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenData = new Authenticator_1.Authenticator();
                const author = tokenData.getData(token);
                if (!author) {
                    throw new Error("Unauthorized user.");
                }
                const musicDatabase = new MusicDatabase_1.MusicDatabase();
                const result = yield musicDatabase.getMusics(author_id);
                if (!result) {
                    throw new Error("Invalid id. Musics not found.");
                }
                return result;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    delete(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenData = new Authenticator_1.Authenticator();
                const author = tokenData.getData(token);
                if (!token || !author) {
                    throw new UnauthorizedError_1.UnauthorizedError("Unauthorized user.");
                }
                if (!id) {
                    throw new InvalidInputError_1.InvalidInputError("Enter an id");
                }
                const musicDatabase = new MusicDatabase_1.MusicDatabase();
                yield musicDatabase.delete(id);
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
}
exports.MusicBusiness = MusicBusiness;
//# sourceMappingURL=MusicBusiness.js.map