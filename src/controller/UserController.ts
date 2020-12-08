import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserInputDTO } from "../model/User";

export class UserController {
    async signup(req: Request, res: Response): Promise<void> {
        try {
            const input: UserInputDTO = {
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password                
            }

            const userBusiness = new UserBusiness()
            const token: string = await userBusiness.signUp(input)

            res.status(200).send({
                token: token,
                message: "User successfully registered."
            })
            
        } catch (error) {
            res.status(400).send({error: error.message})
        }

        await BaseDatabase.destroyConnection();
    }
}