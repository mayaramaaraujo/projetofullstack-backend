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

            throw new Error(error.message || error.sqlMessage)
        }
        
    }

    async getByEmail(email: string) {
        try {
            const result = await this.getConnection()
            .select("*")
            .from(this.tableNames.users)
            .where("email", email)

            return result[0]
            
        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}