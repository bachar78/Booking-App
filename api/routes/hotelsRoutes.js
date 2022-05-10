import express from 'express'
const router = express.Router()
import {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
} from '../controllers/hotelController.js'
//Create and GetAll
router.route('/').post(createHotel).get(getHotels)

//Update & Delete & GetOne
router.route('/:id').put(updateHotel).delete(deleteHotel).get(getHotel)
export default router
