import { Router } from 'express'
import { Register } from '../controllers/sendEmail.js'

const user = Router()

user.post('/send-email', Register)

export default user;
