import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }

  if (token) {
    try {
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //Get user from token
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
})

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
}

const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next()
  } else {
    res.status(403)
    throw new Error('You are not authorized')
  }
}

export { verifyToken, verifyAdmin, verifyUser }
