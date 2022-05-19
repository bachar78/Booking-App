import asyncHandler from 'express-async-handler'
import Hotel from '../models/hotelsModel.js'

//@des Create new Hotel
//@route POST /api/hotels
//@access Private
const createHotel = asyncHandler(async (req, res) => {
  const { name, type, city, address, distance, desc, cheapestPrice } = req.body
  if (
    !name ||
    !type ||
    !city ||
    !address ||
    !distance ||
    !desc ||
    !cheapestPrice
  ) {
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
  const { min, max, others } = req.query
  const allHotels = await Hotel.find({
    ...others,
    cheapestPrice: { $gt: min || 10, $lt: max || 100 },
  }).limit(req.query.limit)
  if (!allHotels) {
    res.status(404)
    throw new Error('Hotels not found')
  }
  res.status(200).json(allHotels)
})
//@des count Hotels by city
//@route Get /api/hotels/countByCity
//@access Public
const countByCity = asyncHandler(async (req, res) => {
  const cities = req.query.cities.split(',')
  const list = await Promise.all(
    cities.map(async (city) => {
      const number = await Hotel.countDocuments({ city })
      return { city, number }
    })
  )
  res.status(200).json(list)
})
//@des Get Hotels by types
//@route Get /api/hotels/countbytype
//@access Public
const countByType = asyncHandler(async (req, res) => {
  const hotelCount = await Hotel.countDocuments({ type: 'Hotel' })
  const appartementCount = await Hotel.countDocuments({ type: 'Appartement' })
  const resortCount = await Hotel.countDocuments({ type: 'Resort' })
  const villaCount = await Hotel.countDocuments({ type: 'Villa' })
  const cabinCount = await Hotel.countDocuments({ type: 'Cabin' })
  res.status(200).json([
    { type: 'Hotel', number: hotelCount },
    { type: 'Appartement', number: appartementCount },
    { type: 'Resort', number: resortCount },
    { type: 'Villa', number: villaCount },
    { type: 'Cabin', number: cabinCount },
  ])
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
  if (!deletedHotel) {
    res.status(401)
    throw new Error('Hotel Can not be deleted')
  }
  res.status(200).json(deletedHotel)
})

export {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
}
