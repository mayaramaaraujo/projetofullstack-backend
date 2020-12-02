"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, nickname, email, password) {
        this.getId = () => { return this.id; };
        this.getName = () => { return this.name; };
        this.getNickname = () => { return this.nickname; };
        this.getEmail = () => { return this.email; };
        this.getPassword = () => { return this.password; };
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }
    static toUserModel(user) {
        return new User(user.id, user.name, user.nickname, user.email, user.password);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map