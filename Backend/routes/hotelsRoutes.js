import express from 'express'
import {
  verifyToken,
  verifyUser,
  verifyAdmin,
} from '../middleware/verifyToken.js'

const router = express.Router()
import {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
} from '../controllers/hotelController.js'
//Create and GetAll
router.route('/').post(verifyToken, verifyAdmin, createHotel).get(getHotels)

//Update & Delete & GetOne
router
  .route('/:id')
  .put(verifyToken, verifyAdmin, updateHotel)
  .delete(verifyToken, verifyAdmin, deleteHotel)
  .get(getHotel)
export default router
