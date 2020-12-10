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
exports.MusicDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class MusicDatabase extends BaseDatabase_1.BaseDatabase {
    create(music) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: music.getId(),
                    title: music.getTitle(),
                    author_id: music.getAuthorId(),
                    date: music.getDate(),
                    file: music.getFile(),
                    genre: music.getGenre(),
                    album: music.getAlbum()
                })
                    .into(this.tableNames.musics);
            }
            catch (error) {
                throw new Error(error.message || error.message);
            }
        });
    }
    getMusics(author_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("*")
                    .from(this.tableNames.musics)
                    .where("author_id", author_id);
                return result[0];
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getAll(author_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("*")
                    .from(this.tableNames.musics)
                    .where("author_id", author_id);
                return result[0];
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection().raw(`
                 DELETE FROM ${this.tableNames.musics} WHERE id = "${id}"
            `);
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
}
exports.MusicDatabase = MusicDatabase;
//# sourceMappingURL=MusicDatabase.js.map