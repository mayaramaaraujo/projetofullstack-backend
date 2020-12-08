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
exports.UserDatabase = void 0;
const DuplicateError_1 = require("../error/DuplicateError");
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: user.getId(),
                    name: user.getName(),
                    nickname: user.getNickname(),
                    email: user.getEmail(),
                    password: user.getPassword()
                })
                    .into(UserDatabase.TABLE_NAME);
            }
            catch (error) {
                if (error.sqlMessage.includes("Duplicate entry")) {
                    throw new DuplicateError_1.DuplicateError("User already registered.");
                }
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = "lamusic_users";
//# sourceMappingURL=UserDatabase.js.map