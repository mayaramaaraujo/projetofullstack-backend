import { GenreDatabase } from "../data/GenreDatabase";
import { InvalidInputError } from "../error/InvalidInputError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Genre, inputGenre } from "../model/Genre";
import { Authenticator, authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class GenreBusiness {
    
    async createGenre(input: inputGenre) {

        try {
            
            const tokenData = new Authenticator()
            const data = tokenData.getData(input.token)

            if(!data) {
                throw new UnauthorizedError("Unauthorized user.")
            }

            if(!input.genre){
                throw new InvalidInputError("Fill in the genre of the song.")
            }

            const idGenerator = new IdGenerator()
            const id: string = idGenerator.generate()

            const genre: Genre = new Genre(id, input.genre.toLowerCase())

            const genreDatabase = new GenreDatabase()
            await genreDatabase.createGenre(genre)

            return id

        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

    async delete(id: string, token: string) {
        try {
            if(!token){
                throw new UnauthorizedError("Unauthorized user.")
            }

            const tokenData = new Authenticator()
            const data = tokenData.getData(token)

            if(!data) {
                throw new UnauthorizedError("Unauthorized user.")
            }

            if(!id){
                throw new InvalidInputError("id is necessary")
            }

            const genreDatabase = new GenreDatabase()
            await genreDatabase.delete(id)

        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

}