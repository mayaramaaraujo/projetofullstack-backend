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
exports.GenreBusiness = void 0;
const GenreDatabase_1 = require("../data/GenreDatabase");
const InvalidInputError_1 = require("../error/InvalidInputError");
const UnauthorizedError_1 = require("../error/UnauthorizedError");
const Genre_1 = require("../model/Genre");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
class GenreBusiness {
    createGenre(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenData = new Authenticator_1.Authenticator();
                const data = tokenData.getData(input.token);
                if (!data) {
                    throw new UnauthorizedError_1.UnauthorizedError("Unauthorized user.");
                }
                if (!input.genre) {
                    throw new InvalidInputError_1.InvalidInputError("Fill in the genre of the song.");
                }
                const idGenerator = new IdGenerator_1.IdGenerator();
                const id = idGenerator.generate();
                const genre = new Genre_1.Genre(id, input.genre.toLowerCase());
                const genreDatabase = new GenreDatabase_1.GenreDatabase();
                yield genreDatabase.createGenre(genre);
                return id;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    delete(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new UnauthorizedError_1.UnauthorizedError("Unauthorized user.");
                }
                const tokenData = new Authenticator_1.Authenticator();
                const data = tokenData.getData(token);
                if (!data) {
                    throw new UnauthorizedError_1.UnauthorizedError("Unauthorized user.");
                }
                if (!id) {
                    throw new InvalidInputError_1.InvalidInputError("id is necessary");
                }
                const genreDatabase = new GenreDatabase_1.GenreDatabase();
                yield genreDatabase.delete(id);
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
}
exports.GenreBusiness = GenreBusiness;
//# sourceMappingURL=GenreBusiness.js.map