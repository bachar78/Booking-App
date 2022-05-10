import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './connectDb/connectDB.js'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import errorHandler from './middleware/errorHandler.js'
dotenv.config()

const PORT = 8800
const app = express()

//middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

//Error Handler middleware
app.use(errorHandler)

app.listen(PORT, () => {
  //Connect with DB
  connectDB()
  console.log(`Server is on ${PORT}`)
})
