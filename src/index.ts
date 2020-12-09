import express, {Express} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './routes/userRouter';
import { genreRouter } from './routes/genreRouter';
import { musicRouter } from './routes/musicRouter';

dotenv.config();

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use("/user", userRouter)

app.use("/genre", genreRouter)

app.use("/music", musicRouter)

const server = app.listen(3003, () => {
    console.log("Server is running...")
})