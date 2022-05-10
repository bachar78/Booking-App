import express from 'express'
const router = express.Router()
import {register} from '../controllers/authController.js'
router.route('/register').post(register)








export default router