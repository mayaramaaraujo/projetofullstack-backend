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
                    id: music.id,
                    title: music.title,
                    author_id: music.author_id,
                    date: music.date,
                    file: music.file,
                    genre: music.genre,
                    album: music.album
                })
                    .into(this.tableNames.musics);
            }
            catch (error) {
                throw new Error(error.message || error.message);
            }
        });
    }
}
exports.MusicDatabase = MusicDatabase;
//# sourceMappingURL=MusicDatabase.js.map