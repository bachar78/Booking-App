import asyncHandler from 'express-async-handler'
import Hotel from '../models/hotelsModel.js'

//@des Create new Hotel
//@route POST /api/hotels
//@access Private
const createHotel = asyncHandler(async (req, res) => {
  const { name, type, city, address, distance, desc, cheapestPrice } = req.body
  if (!name || !type || !city || !address || !distance || !desc || !cheapestPrice) {
    res.status(400)
    throw new Error('Please fill all the fields')
  }
  const newHotel = await Hotel.create(req.body)
  if (!newHotel) {
    res.status(401)
    throw new Error('Invalid Credential')
  }
  res.status(200).json(newHotel)
})

//@des Get all Hotels
//@route Get /api/hotels
//@access Public
const getHotels = asyncHandler(async (req, res) => {
  const allHotels = await Hotel.find()
  if (!allHotels) {
    res.status(404)
    throw new Error('Hotels not found')
  }
  res.status(200).json(allHotels)
})

//@des Get a single hotel
//@route GET /api/hotels/:id
//@access Public
const getHotel = asyncHandler(async (req, res) => {
  const { id } = req.params
  const foundHotel = await Hotel.findById(id)
  if (!foundHotel) {
    res.status(404)
    throw new Error('This hotel was not found')
  }
  res.status(200).json(foundHotel)
})

//@des update a Hotel
//@route PUT /api/hotels/:id
//@access Private
const updateHotel = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updatedHotel = await Hotel.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  )
  if (!updatedHotel) {
    res.status(401)
    throw new Error('hotel not updated ')
  }
  res.status(200).json(updatedHotel)
})

//@des delete Hotel
//@route DELETE /api/hotels/:id
//@access Private
const deleteHotel = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deletedHotel = await Hotel.findByIdAndDelete(id)
  if(!deletedHotel) {
    res.status(401)
    throw new Error('Hotel Can not be deleted')
  }
  res.status(200).json(deletedHotel)
})

export { createHotel, getHotels, getHotel, updateHotel, deleteHotel}
