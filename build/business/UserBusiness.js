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
exports.UserBusiness = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const InvalidInputError_1 = require("../error/InvalidInputError");
const User_1 = require("../model/User");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
class UserBusiness {
    signUp(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.name ||
                    !input.email ||
                    !input.nickname ||
                    !input.password) {
                    throw new InvalidInputError_1.InvalidInputError("Fill in all fields.");
                }
                if (input.email.indexOf("@") === -1) {
                    throw new InvalidInputError_1.InvalidInputError("Invalid email");
                }
                if (input.password.length < 6) {
                    throw new InvalidInputError_1.InvalidInputError("Password should have more than 6 digits");
                }
                const idGenerator = new IdGenerator_1.IdGenerator();
                const id = idGenerator.generate();
                const hash = new HashManager_1.HashManager();
                const hashPassword = yield hash.hash(input.password);
                const newUser = new User_1.User(id, input.name, input.nickname, input.email, hashPassword);
                const userDatabase = new UserDatabase_1.UserDatabase();
                yield userDatabase.signUp(newUser);
                const tokenGenerate = new Authenticator_1.Authenticator();
                const token = tokenGenerate.generateToken({ id: id });
                return token;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.email || !input.password) {
                    throw new InvalidInputError_1.InvalidInputError("Fill in all fields");
                }
                if (input.email.indexOf("@") === -1) {
                    throw new InvalidInputError_1.InvalidInputError("Invalid email format");
                }
                const userDatabase = new UserDatabase_1.UserDatabase();
                const userFromDB = yield userDatabase.getByEmail(input.email);
                const user = new User_1.User(userFromDB.id, userFromDB.name, userFromDB.nickname, userFromDB.email, userFromDB.password);
                const hash = new HashManager_1.HashManager();
                const hashCompare = yield hash.compare(input.password, user.getPassword());
                if (!hashCompare) {
                    throw new InvalidInputError_1.InvalidInputError("Invalid password.");
                }
                const auth = new Authenticator_1.Authenticator();
                const token = auth.generateToken({ id: user.getId() });
                return token;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map