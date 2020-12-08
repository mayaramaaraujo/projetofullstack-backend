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
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    name: req.body.name,
                    nickname: req.body.nickname,
                    email: req.body.email,
                    password: req.body.password
                };
                const userBusiness = new UserBusiness_1.UserBusiness();
                const token = yield userBusiness.signUp(input);
                res.status(200).send({
                    token: token,
                    message: "User successfully registered."
                });
            }
            catch (error) {
                res.status(error.code).send({ error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map