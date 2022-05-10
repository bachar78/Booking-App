import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(401)
    throw new Error('Please fill all filds')
  }
  const newUser = User.create(req.body)
  if (!newUser) {
    res.status(401)
    throw new Error('User can not be resgisterd')
  }
  res.status(201).json(newUser)
})


export {register}