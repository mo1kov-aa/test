import { Router } from "express";
import AuthController from '../controller/user.controller.js'

const authRoutes = Router()

authRoutes.post('/signup', AuthController.signup)

authRoutes.post('/login', AuthController.login)

export default authRoutes