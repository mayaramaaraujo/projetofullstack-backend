import { DuplicateError } from "../error/DuplicateError";
import { Genre } from "../model/Genre";
import { BaseDatabase } from "./BaseDatabase";

export class GenreDatabase extends BaseDatabase {
    async createGenre(genre: Genre){
        try {
            await this.getConnection()
            .insert({
                id: genre.getId(), 
                genre: genre.getName() 
            })
            .into(this.tableNames.genres)

        } catch (error) {

            if(error.sqlMessage.includes("Duplicate entry")) {
                throw new DuplicateError("Genre already registered.")
            }

            throw new Error(error.sqlMessage || error.message)
        }
    }

    async delete(id: string){
        try {
            const result = await this.getConnection().raw(`
                DELETE FROM ${this.tableNames.genres} WHERE id = "${id}"
            `)

        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}