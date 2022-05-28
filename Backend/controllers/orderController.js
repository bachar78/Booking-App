import Order from '../models/Order.js'
import Room from '../models/roomsModel.js'
import Hotel from '../models/hotelsModel.js'
import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
export const createOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const { rooms, dates } = req.body
  const hotel = await Hotel.findById(id)
  if (!hotel) {
    res.status(404)
    throw new Error("Hotel can't be found")
  }
  if (dates.startDate === dates.endDate) {
    res.status(400)
    throw new Error('You should insert two different dates')
  }
  const order = await Order.create({
    user: req.user.username,
    startDate: dates.startDate,
    endDate: dates.endDate,
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

  const output = `
  <h1>User Name: ${order.user}</h1>
  <h3>Hotel Address: ${order.hotel.address}-${order.hotel.city}</h3>
  <h3>Time of accommodation: From:${order.startDate}, to:${order.endDate}</h3>
  <h3>Your Code Is : ${order._id} </h3>
`
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  })
  let mailOptions = {
    from: process.env.EMAIL_ADDRESS, // sender address
    to: req.user.email, // list of receivers
    subject: 'Confirmation of reservation', // Subject line
    text: 'Hello world?', // plain text body
    html: output, // html body
  }

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return next()
    }
  })
  res.status(201).json(order)
})
