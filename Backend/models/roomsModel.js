import mongoose from 'mongoose'
const { Schema } = mongoose
const roomNumberScema = new Schema({
  number: Number,
  unavailableDates: { type: [Date] },
})
const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [roomNumberScema],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Room', roomSchema)
