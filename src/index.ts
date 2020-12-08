import express, {Express} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './routes/userRouter';

dotenv.config();

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use("/user", userRouter)

const server = app.listen(3003, () => {
    console.log("Server is running...")
})