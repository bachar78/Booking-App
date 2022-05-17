import express from 'express'
const router = express.Router()
import {
  createRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} from '../controllers/roomControlloer.js'
import { verifyToken, verifyAdmin } from '../middleware/verifyToken.js'

//Create and GetAll
router.route('/:hotelId').post(verifyToken, verifyAdmin, createRoom)

router.route('/').get(verifyToken, verifyAdmin, getRooms)

//Update & GetOne
router
  .route('/:id')
  .put(verifyToken, verifyAdmin, updateRoom)
  .get(verifyToken, verifyAdmin, getRoom)

//Delete a Room
router.route('/:hotelId/:id').delete(verifyToken, verifyAdmin, deleteRoom)
export default router
