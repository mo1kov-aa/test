import type {Request, Response} from 'express'
import authService from '../service/auth.service.js'

class AuthController{
    signup = async(req:Request, res:Response) => {
        try{
            const {name, username, password} = req.body

            await authService.signupService(name, username, password)

            return res.json({message: 'User created'})
        }catch(err: any){
            res.json({message: err.message})
        }
    }

    login = async(req:Request, res:Response) => {
       try{
            const {username, password} = req.body

            const token = await authService.loginService(username, password)

            return res.json({token})
        }catch(err: any){
            res.json({message: err.message})
        }
    }
}

export default new AuthController()