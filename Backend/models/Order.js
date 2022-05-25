import mongoose from 'mongoose'
const { Schema } = mongoose

const orderSchema = new Schema(
  {
    user_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    hotel: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Hotel' }],
    rooms: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Room' }],
    price: {
      type: Number,
    },
    startDate: { type: Date },
    endDate: { type: Date },
    is_paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
