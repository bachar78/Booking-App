import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './connectDb/connectDB.js'
import authRoute from './routes/authRoutes.js'
import usersRoute from './routes/usersRoutes.js'
import hotelsRoute from './routes/hotelsRoutes.js'
import roomsRoute from './routes/roomsRoutes.js'
import errorHandler from './middleware/errorHandler.js'
import cookieParser from 'cookie-parser'


dotenv.config()
//Connect with DB
connectDB()
const PORT = process.env.PORT || 5001
const app = express()

//middleware
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

//? Middlewaares of routes
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

//Serve Frontend
if (process.env.NODE_ENV === 'production') {
  //Set build folder as static
  app.use(
    express.static(new URL('../Frontend/build', import.meta.url).pathname)
  )
  app.get('*', (req, res) =>
    res.sendFile(
      new URL('../Frontend/build/index.html', import.meta.url).pathname
    )
  )
}

//Error Handler middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is on ${PORT}`)
})
