"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
class Music {
    constructor(id, title, author_id, date, file, genre, album) {
        this.id = id;
        this.title = title;
        this.author_id = author_id;
        this.date = date;
        this.file = file;
        this.genre = genre;
        this.album = album;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getAuthorId() {
        return this.author_id;
    }
    getDate() {
        return this.date;
    }
    getFile() {
        return this.file;
    }
    getGenre() {
        return this.genre;
    }
    getAlbum() {
        return this.album;
    }
}
exports.Music = Music;
//# sourceMappingURL=Music.js.map