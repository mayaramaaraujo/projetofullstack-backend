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
exports.GenreDatabase = void 0;
const DuplicateError_1 = require("../error/DuplicateError");
const BaseDatabase_1 = require("./BaseDatabase");
class GenreDatabase extends BaseDatabase_1.BaseDatabase {
    createGenre(genre) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: genre.getId(),
                    genre: genre.getName()
                })
                    .into(this.tableNames.genres);
            }
            catch (error) {
                if (error.sqlMessage.includes("Duplicate entry")) {
                    throw new DuplicateError_1.DuplicateError("User already registered.");
                }
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.GenreDatabase = GenreDatabase;
//# sourceMappingURL=GenreDatabase.js.map