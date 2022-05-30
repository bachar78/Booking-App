import colors from 'colors'
import mongoose from 'mongoose'
import Hotel from '../models/hotelsModel.js'
import Room from '../models/roomsModel.js'
import { faker } from '@faker-js/faker'
import {
  types,
  places,
  descriptors,
  distance,
  rating,
  roomTitle,
  data,
} from './helpers.js'

const sample = (array) => array[Math.floor(Math.random() * array.length)]
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://Bachar:Shams2015@bookingapp.bbb6m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    )
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

// connectDB()
connectDB()

const seedDb = async () => {
  await Hotel.deleteMany({})
  await Room.deleteMany({})
  for (let i = 0; i < 500; i++) {
    const hotel = await Hotel.create({
      name: `${sample(descriptors)} ${sample(places)}`,
      type: sample(types),
      city: data[i].City,
      address:
        data[i].Street +
        '-' +
        data[i].Zip_code +
        '-' +
        data[i].City +
        '-' +
        data[i].State,
      phone_number: faker.phone.phoneNumberFormat(),
      distance: sample(distance),
      desc: faker.lorem.paragraph(5),
      rating: sample(rating),
      rooms: [],
      cheapestPrice: Math.floor(Math.random() * 150) + 50,
      featured: i % 2 === 0 ? true : false,
    })

    const kingRoom = await Room.create({
      title: 'King Room',
      price: 500,
      maxPeople: 5,
      desc: 'King size, 5 beds, 3 bathroom, 2 balcony',
      roomNumbers: [
        { number: 101, unavailableDates: [] },
        { number: 102, unavailableDates: [] },
        { number: 103, unavailableDates: [] },
        { number: 104, unavailableDates: [] },
        { number: 105, unavailableDates: [] },
        { number: 106, unavailableDates: [] },
        { number: 107, unavailableDates: [] },
        { number: 108, unavailableDates: [] },
        { number: 109, unavailableDates: [] },
        { number: 110, unavailableDates: [] },
      ],
    })
    hotel.rooms.push(kingRoom._id)
    const PrivateRoom = await Room.create({
      title: 'Private Room',
      price: 150,
      maxPeople: 1,
      desc: 'Small size, 1 bed, 1 bathroom, one balcony, possibility cancelation',
      roomNumbers: [
        { number: 111, unavailableDates: [] },
        { number: 112, unavailableDates: [] },
        { number: 113, unavailableDates: [] },
        { number: 114, unavailableDates: [] },
        { number: 115, unavailableDates: [] },
        { number: 116, unavailableDates: [] },
        { number: 117, unavailableDates: [] },
        { number: 118, unavailableDates: [] },
        { number: 119, unavailableDates: [] },
        { number: 120, unavailableDates: [] },
      ],
    })
    hotel.rooms.push(PrivateRoom._id)
    const DoubleRoom = await Room.create({
      title: 'Double Room',
      price: 200,
      maxPeople: 2,
      desc: 'Medium size, 2 bed, 1 bathroom, one balcony',
      roomNumbers: [
        { number: 121, unavailableDates: [] },
        { number: 122, unavailableDates: [] },
        { number: 123, unavailableDates: [] },
        { number: 124, unavailableDates: [] },
        { number: 125, unavailableDates: [] },
        { number: 126, unavailableDates: [] },
        { number: 127, unavailableDates: [] },
        { number: 128, unavailableDates: [] },
        { number: 129, unavailableDates: [] },
        { number: 130, unavailableDates: [] },
      ],
    })
    hotel.rooms.push(DoubleRoom._id)

    const SingleRoom = await Room.create({
      title: 'Single Room',
      price: 100,
      maxPeople: 1,
      desc: 'Small size, 1 bed, 1 bathroom, no balcony',
      roomNumbers: [
        { number: 131, unavailableDates: [] },
        { number: 132, unavailableDates: [] },
        { number: 133, unavailableDates: [] },
        { number: 134, unavailableDates: [] },
        { number: 135, unavailableDates: [] },
        { number: 136, unavailableDates: [] },
        { number: 137, unavailableDates: [] },
        { number: 138, unavailableDates: [] },
        { number: 139, unavailableDates: [] },
        { number: 140, unavailableDates: [] },
      ],
    })
    hotel.rooms.push(SingleRoom._id)
    await hotel.save()
  }
}
seedDb().then(() => {
  mongoose.connection.close()
})
