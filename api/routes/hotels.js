import express from 'express'
import asyncHandler from 'express-async-handler'
import Hotel from '../models/hotelsModel.js'
const router = express.Router()

//Create and GetAll
router
  .route('/')
  .post(
    asyncHandler(async (req, res) => {
      const newHotel = await Hotel.create(req.body)
      res.status(200).json(newHotel)
    })
  )

  .get(
    asyncHandler(async (req, res) => {
      const allHotels = await Hotel.find()
      res.status(200).json(allHotels)
    })
  )

//Update & Delete & GetOne
router
  .route('/:id')
  .put(
    asyncHandler(async (req, res) => {
      const { id } = req.params
      const updatedHotel = await Hotel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      )
      res.status(200).json(updatedHotel)
    })
  )
  .delete(
    asyncHandler(async (req, res) => {
      const { id } = req.params
      const deletedHotel = await Hotel.findByIdAndDelete(id)
      res.status(200).json({ message: 'Hotel has been deleted' })
    })
  )
  .get(
    asyncHandler(async (req, res) => {
      const { id } = req.params
      const foundHotel = await Hotel.findById(id)
      res.status(200).json(foundHotel)
    })
  )
export default router
