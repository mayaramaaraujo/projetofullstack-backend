import { Request, Response } from "express";
import { GenreBusiness } from "../business/GenreBusiness";
import { GenreDatabase } from "../data/GenreDatabase";

export class GenreController {
    async createGenre(req: Request, res: Response): Promise<void>{
        try {
            const token: string = req.headers.authorization as string
            const genre: string = req.body.genre

            const genreBusiness: GenreBusiness = new GenreBusiness()
            const result: string = await genreBusiness.createGenre({token, genre})

            res.status(200).send({id_genre: result,message: "Genre created successfully!"})

        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage)
        }

    }

    async delete(req: Request, res: Response) {
        try {
            const token: string = req.headers.authorization as string

            const genreBusiness: GenreBusiness = new GenreBusiness()
            
            await genreBusiness.delete(req.params.id, token)

            res.status(200).send("Music genre successfully deleted.")
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage)
        }
    }
}
