import { DuplicateError } from "../error/DuplicateError";
import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    async signUp(user: User) {
        try {

            await this.getConnection()
            .insert({
                id: user.getId(),
                name: user.getName(),
                nickname: user.getNickname(),
                email: user.getEmail(),
                password: user.getPassword()
            })
            .into(this.tableNames.users)

        } catch (error) {
            if(error.sqlMessage.includes("Duplicate entry")){
                throw new DuplicateError("User already registered.")
            }

            console.log(error.sqlMessage)

            throw new Error(error.message || error.sqlMessage)
        }
        
    }
}