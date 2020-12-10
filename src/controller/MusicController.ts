import { Request, Response } from "express";
import { MusicBusiness } from "../business/MusicBusiness";
import { MusicBusinessInput } from "../model/Music";
import { Authenticator } from "../services/Authenticator";

export class MusicController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const newMusic: MusicBusinessInput = {
                token: req.headers.authorization as string,
                title: req.body.title,
                file: req.body.file,
                genre: req.body.genre_id,
                album: req.body.album
            }
            const musicBusiness = new MusicBusiness()
            await musicBusiness.create(newMusic)

            res.status(200).send("Music created successfully")

        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage)
        }
    }

    public async getMusics(req: Request, res: Response){
        try {
            const token: string = req.headers.authorization as string

            const musicBusiness = new MusicBusiness()
            const result = await musicBusiness.getMusics(token)

            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage)
        }
    }

    public async getByAuthorId(req: Request, res: Response){
        try {
            const token: string = req.headers.authorization as string
            const author_id: string = req.params.author_id

            const musicBusiness = new MusicBusiness()
            const result = await musicBusiness.getMusicsByAuthorId(author_id, token)

            res.status(200).send(result)
        } catch (error) {
            let errorMessage;
            let errorCode;

            if(error.message.includes("jwt must be provided")){
               errorMessage = "Unauthorized user."
               errorCode = 401
            }
            res.status(errorCode || 400).send(errorMessage || error.message || error.sqlMessage)
        }
    }

    public async delete(req:Request, res: Response){
        try {
            const token = req.headers.authorization

            if(!token){
                throw new Error("Insira um token")
            }

            const id:string = req.params.id

            const musicBusiness = new MusicBusiness()
            await musicBusiness.delete(id, token)

            res.status(200).send("Music deleted successfully.")
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage)
        }
    }
}