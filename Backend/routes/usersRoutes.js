import express from 'express'
const router = express.Router()
import {
  verifyToken,
  verifyUser,
  verifyAdmin,
} from '../middleware/verifyToken.js'

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js'

// //? check authentication
// router.route('/checkauthentication').get(
//   verifyToken,
//   asyncHandler((req, res) => {
//     res.send('Welcome you are authinticated')
//   })
// )
// //? check user
// router.route('/checkuser/:id').get(verifyToken, verifyUser, (req, res) => {
//   res.send('Now you can delete your acount')
// })

// //?Check Admin
// router.route('/checkadmin/:id').get(verifyToken, verifyAdmin, (req, res) => {
//   res.send('You are admin and you can do whatever you want')
// })

//? GetAll Users
router.route('/').get(verifyToken, verifyAdmin, getUsers)

//? Update & Delete & GetOne user
router
  .route('/:id')
  .put(verifyToken, verifyUser, updateUser)
  .delete(verifyToken, verifyUser, deleteUser)
  .get(verifyToken, verifyUser, getUser)
export default router
