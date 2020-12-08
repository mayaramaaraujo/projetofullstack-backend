import { UserDatabase } from "../data/UserDatabase";
import { InvalidInputError } from "../error/InvalidInputError";
import { User, UserInputDTO, UserInputLoginEmailDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    async signUp(input: UserInputDTO): Promise<string> {
        try {

            if(
                !input.name ||
                !input.email ||
                !input.nickname ||
                !input.password
            ) {
                throw new InvalidInputError("Fill in all fields.")
            }

            if(input.email.indexOf("@") === -1) {
                throw new InvalidInputError("Invalid email")
            }

            if(input.password.length < 6){
                throw new InvalidInputError("Password should have more than 6 digits")
            }
    
            const idGenerator = new IdGenerator()
            const id: string = idGenerator.generate()
    
            const hash = new HashManager()
            const hashPassword = await hash.hash(input.password)
     
            const newUser: User = new User(id, input.name, input.nickname, input.email, hashPassword)
    
            const userDatabase = new UserDatabase()        
            await userDatabase.signUp(newUser)

            const tokenGenerate = new Authenticator()
            const token: string = tokenGenerate.generateToken({id: id})

            return token
        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }

       
    }

    async login(input: UserInputLoginEmailDTO){
        try {

            if(!input.email || !input.password) {
                throw new InvalidInputError("Fill in all fields")
            }

            if(input.email.indexOf("@") === -1){
                throw new InvalidInputError("Invalid email format")
            }

            const userDatabase: UserDatabase = new UserDatabase()
            const userFromDB = await userDatabase.getByEmail(input.email)
            const user = new User(userFromDB.id, userFromDB.name, userFromDB.nickname, userFromDB.email, userFromDB.password)
            
            const hash = new HashManager()
            const hashCompare = await hash.compare(input.password, user.getPassword())

            if(!hashCompare) {
                throw new InvalidInputError("Invalid password.")
            }
            
            const auth = new Authenticator()
            const token = auth.generateToken({id: user.getId()})

            return token
            
        } catch (error) {
          
            throw new Error(error.message || error.sqlMessage)
        }
    }
}