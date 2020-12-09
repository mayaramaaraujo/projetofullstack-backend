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
exports.GenreController = void 0;
const GenreBusiness_1 = require("../business/GenreBusiness");
class GenreController {
    createGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const genre = req.body.genre;
                const genreBusiness = new GenreBusiness_1.GenreBusiness();
                const result = yield genreBusiness.createGenre({ token, genre });
                console.log(result);
                res.status(200).send({ id_genre: result, message: "Genre created successfully!" });
            }
            catch (error) {
                res.status(400).send(error.message || error.sqlMessage);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const genreBusiness = new GenreBusiness_1.GenreBusiness();
                const result = yield genreBusiness.delete(req.params.id, token);
                console.log(result);
                res.status(200).send("Music genre successfully deleted.");
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
}
exports.GenreController = GenreController;
debugger;
//# sourceMappingURL=GenreController.js.map