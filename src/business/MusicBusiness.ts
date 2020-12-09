import { MusicDatabase } from "../data/MusicDatabase";
import { InvalidInputError } from "../error/InvalidInputError";
import { Music, MusicBusinessInput } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class MusicBusiness {
    public async create(input: MusicBusinessInput){
        try {
            const tokenData = new Authenticator()
            const author = tokenData.getData(input.token)

            const idGenerator = new IdGenerator()
            const id: string = idGenerator.generate()

            if(
                !input.title ||
                !input.file || 
                !input.album || 
                !input.genre || 
                !input.token
            ) {
                throw new InvalidInputError("Fill in all fields.")
            }

            const day = new Date().getDate()
            const month = new Date().getMonth()
            const year = new Date().getFullYear()

            const date = `${day}-${month}-${year}`

            const newMusic = new Music(id, input.title, author.id, date, input.file, input.genre, input.album)

            const musicDatabase = new MusicDatabase()
            await musicDatabase.create(newMusic)            
            
        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

    public async getMusics(token: string){
        try {
            const tokenData = new Authenticator()
            const author = tokenData.getData(token)

            if(!author){
                throw new Error("Invalid author")
            }

            const musicDatabase = new MusicDatabase()
            const result = await musicDatabase.getMusics(author.id)

            if(!result){
                throw new Error("Invalid id. Musics not found.")
            }

            return result
        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

    public async getMusicsByAuthorId(author_id: string, token: string){
        try {
            const tokenData = new Authenticator()
            const author = tokenData.getData(token)

            if(!author){
                throw new Error("Unauthorized user.")
            }

            const musicDatabase = new MusicDatabase()
            const result = await musicDatabase.getMusics(author_id)

            if(!result){
                throw new Error("Invalid id. Musics not found.")
            }

            return result
        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}