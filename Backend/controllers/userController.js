import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


//@des Get all Users
//@route Get /api/users
//@access Public
const getUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find()
  if (!allUsers) {
    res.status(404)
    throw new Error('Users not found')
  }
  res.status(200).json(allUsers)
})

//@des Get a single hotel
//@route GET /api/users/:id
//@access Public
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const foundUser = await User.findById(id)
  if (!foundUser) {
    res.status(404)
    throw new Error('This hotel was not found')
  }
  res.status(200).json(foundUser)
})

//@des update a User
//@route PUT /api/users/:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  )
  if (!updatedUser) {
    res.status(401)
    throw new Error('User not updated ')
  }
  res.status(200).json(updatedUser)
})

//@des delete User
//@route DELETE /api/users/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deletedUser = await User.findByIdAndDelete(id)
  if (!deletedUser) {
    res.statusUser
    throw new Error('User Can not be deleted')
  }
  res.status(200).json(deletedUser)
})

export { getUsers, getUser, updateUser, deleteUser }
