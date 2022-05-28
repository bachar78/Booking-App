import mongoose from 'mongoose'
const { Schema } = mongoose

const orderSchema = new Schema(
  {
    user: { type: String },
    hotel: {
      name: {
        type: String,
      },
      address: { type: String },
      city: { type: String },
      type: { type: String },
    },
    rooms: [
      {
        number: { type: Number },
        desc: { type: String },
        price: { type: Number },
      },
    ],
    startDate: { type: String },
    endDate: { type: String },
    is_paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
