import Room from '../models/roomsModel.js'
import Hotel from '../models/hotelsModel.js'
import asyncHandler from 'express-async-handler'

//@des Create new Room
//@route POST /api/hotels/:id/rooms
//@access Private
const createRoom = asyncHandler(async (req, res) => {
  const { hotelId } = req.params
  const { title, price, maxPeople, desc } = req.body
  if ((!title, !price, !maxPeople, !desc)) {
    res.status(400)
    throw new Error('Please fill all required fields')
  }
  const newRoom = await Room.create(req.body)
  if (!newRoom) {
    res.status(404)
    throw new Error("Can't create a new room")
  }
  const findHotel = await Hotel.findByIdAndUpdate(hotelId, {
    $push: { rooms: newRoom._id },
  })
  if (!findHotel) {
    res.status(400)
    throw new Error("Hotel can't be found")
  }
  newRoom.hotel = findHotel._id
  await newRoom.save()
  res.status(200).json(newRoom)
})

//@des Get all Rooms
//@route Get /api/rooms
//@access Private
const getRooms = asyncHandler(async (req, res) => {
  const allRooms = await Room.find()
  if (!allRooms) {
    res.status(404)
    throw new Error('Rooms not found')
  }
  res.status(200).json(allRooms)
})

//@des Get a single hotel
//@route GET /api/rooms/:id
//@access Public
const getRoom = asyncHandler(async (req, res) => {
  const { id } = req.params
  const foundRoom = await Room.findById(id)
  if (!foundRoom) {
    res.status(404)
    throw new Error('This room was not found')
  }
  res.status(200).json(foundRoom)
})

//@des update a Room
//@route PUT /api/rooms/:id
//@access Private
const updateRoom = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updatedRoom = await Room.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  )
  if (!updatedRoom) {
    res.status(401)
    throw new Error('Room not updated ')
  }
  res.status(200).json(updatedRoom)
})
//@des update a Room
//@route PUT /api/rooms/availability/:id
//@access Private
const updateRoomAvailability = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updatedRoom = await Room.updateOne(
    { 'roomNumbers._id': id },
    {
      $push: {
        'roomNumbers.$.unavailableDates': req.body.dates,
      },
    }
  )
  if (!updatedRoom) {
    res.status(401)
    throw new Error('Room not updated ')
  }
  res.status(200).json({"message": "reserved"})
})

//@des delete Room
//@route DELETE /api/rooms/:id
//@access Private
const deleteRoom = asyncHandler(async (req, res) => {
  const { hotelId, id } = req.params
  const deletedRoom = await Room.findByIdAndDelete(id)
  if (!deletedRoom) {
    res.status(401)
    throw new Error('Room Can not be deleted')
  }
  await Hotel.findByIdAndUpdate(hotelId, {
    $pull: { rooms: deletedRoom._id },
  })
  res.status(200).json(deletedRoom)
})

export {
  createRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
}
