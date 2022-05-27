import Order from '../models/Order.js'
import Room from '../models/roomsModel.js'
import Hotel from '../models/hotelsModel.js'
import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
export const createOrder = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { rooms, dates } = req.body
  const hotel = await Hotel.findById(id)
  if (!hotel) {
    res.status(404)
    throw new Error("Hotel can't be found")
  }
  if (dates[0].startDate === dates[0].endDate) {
    res.status(400)
    throw new Error('You should insert two different dates')
  }
  const order = await Order.create({
    user: req.user.username,
    startDate: dates[0].startDate,
    endDate: dates[0].endDate,
  })
  if (!order) {
    res.status(404)
    throw new Error("Order can't be done")
  }
  order.user = req.user.username
  order.hotel.name = hotel.name
  order.hotel.address = hotel.address
  order.hotel.city = hotel.city
  order.hotel.type = hotel.type
  await order.save()
  order.rooms = await Promise.all(
    rooms.map(async (room) => {
      const orderRoom = await Room.findOne({ 'roomNumbers._id': room.id })
      if (!orderRoom) {
        res.status(404)
        throw new Error("Room can't be found")
      }
      return {
        number: room.number,
        desc: orderRoom.desc,
        price: orderRoom.price,
      }
    })
  )
  await order.save()
  res.status(200).json(order)
})
