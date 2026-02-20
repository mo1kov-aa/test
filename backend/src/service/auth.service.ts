import UserDatabase from "../data-access-layer/user.database.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthService{
    signupService = async (name: string, username: string, password:string) =>{
        const user = await UserDatabase.isUsernameTaken(username)
        
        if(user.rows.length > 0){
            throw new Error('Username is already taken')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await UserDatabase.createUser(name, username, hashedPassword)
    }

    loginService = async (username: string, password:string) =>{
        const user = await UserDatabase.searchUser(username)

        if(user === undefined){
            throw new Error('User not found')
        }

       const isValidPassword = await bcrypt.compare(password, user.password)

       if(!isValidPassword){
        throw new Error('Wrong data')
       }

       const token = jwt.sign(
        {id: user.id , role: user.role},
        String(process.env.JWT_SECRET),
        {expiresIn: '24h'})

        return token
    }
}

export default new AuthService()