import express from 'express'
import { verifyToken, verifyAdmin } from '../middleware/verifyToken.js'

const router = express.Router()
import {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType
} from '../controllers/hotelController.js'
//Create and GetAll
router.route('/').post(verifyToken, verifyAdmin, createHotel).get(getHotels)
router.route('/countbycity').get(countByCity)
router.route('/countbytype').get(countByType)

//Update & Delete & GetOne
router
  .route('/:id')
  .put(verifyToken, verifyAdmin, updateHotel)
  .delete(verifyToken, verifyAdmin, deleteHotel)
  .get(getHotel)




export default router
