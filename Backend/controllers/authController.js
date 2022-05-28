import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//@des Register a new user
//@route POST /api/auth/register
//@access Public
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(401)
    throw new Error('Please fill all filds')
  }
  const findUser = await User.findOne({ username: req.body.username })
  if (findUser) {
    res.status(400)
    throw new Error(
      'The username is already used please choose another usename'
    )
  }
  //? Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  })
  if (!newUser) {
    res.status(401)
    throw new Error('User can not be resgisterd')
  }
  const token = jwt.sign(
    { id: newUser._id, isAdmin: newUser.isAdmin },
    process.env.JWT_SECRET
  )
  res
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .status(200)
    .json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    })
})

//@des Login a user
//@route /api/auth/login
//@access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  //check member and password mach
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    )
    const { password, isAdmin, ...otherDetails } = user._doc

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        ...otherDetails,
      })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})
export { register, login }
