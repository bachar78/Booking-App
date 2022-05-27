import Order from '../models/Order.js'
import Room from '../models/roomsModel.js'
import Hotel from '../models/hotelsModel.js'
import asyncHandler from 'express-async-handler'
import hotelsModel from '../models/hotelsModel.js'

export const createOrder = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { rooms, dates } = req.body
  const hotel = await Hotel.findById(id)
  const order = await Order.create({
    user: req.user.username,
    startDate: dates.startDate,
    endDate: dates.endDate,
  })
  order.user = req.user.username
  order.hotel.name = hotel.name
  order.hotel.address = hotel.address
  order.hotel.city = hotel.city
  await order.save()
  order.rooms = await Promise.all(
    rooms.map(async (room) => {
      const orderRoom = await Room.findOne({ 'roomNumbers._id': room.id })
      console.log(orderRoom)
      return {
        number: room.number,
        desc: orderRoom.desc,
        price: orderRoom.price,
      }
    })
  )
  await order.save()
  console.log(order)
  res.status(200).json(order)
})
