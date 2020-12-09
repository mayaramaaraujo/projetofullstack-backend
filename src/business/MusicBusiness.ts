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
}