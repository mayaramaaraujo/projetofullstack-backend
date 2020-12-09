import { Request, Response } from "express";
import { MusicBusiness } from "../business/MusicBusiness";
import { MusicBusinessInput } from "../model/Music";

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
}