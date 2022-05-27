import './confirmation.css'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { SearchContext } from '../../context/SearchContext'
import { OrderContext } from '../../context/OrderContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { dayDifference } from '../../utils/dayDifference'
const Confirmation = ({ hotelId, setOpenConfirmation }) => {
  const { dates, selectedRooms, setSelectedRooms } = useContext(SearchContext)
  const { order, error, loading, dispatch } = useContext(OrderContext)
  const days = dayDifference(dates[0].endDate, dates[0].startDate)
  const navigate = useNavigate()
  const handleClick = () => {
    setOpenConfirmation(false)
    navigate('/')
  }

  useEffect(() => {
    ;(async () => {
      const newSelectedRoom = selectedRooms.map((room) => ({
        id: room.split(',')[0],
        number: room.split(',')[1],
      }))
      try {
        const res = await axios.post(`/rooms/confirmation/${hotelId}`, {
          rooms: newSelectedRoom,
          dates,
        })
        dispatch({ type: 'ORDER_SUCCESS', payload: res.data })
        setSelectedRooms([])
      } catch (err) {
        dispatch({ type: 'ORDER_FAILURE', payload: err.response.data })
      }
    })()
  }, [dates, hotelId, setSelectedRooms])

  if (error) {
    return (
      <div className='error'>
        <h1>
          <span>{error?.message}</span>
          <Link to='/hotels'>Reserve at least one night</Link>
        </h1>
      </div>
    )
  }
  console.log(order)
  return (
    order && (
      <div className='reserve'>
        <div className='reserveContainer'>
          <h2 className='orderName'>
            Thank you mr(s) <span>{order.user}</span> for choosing Full Life for
            your booking
          </h2>
          <p className='orderDetails'>
            You have just reserved in {order.hotel.name}-{order.hotel.type} in{' '}
            {order.hotel.address}-{order.hotel.city}
          </p>
          <h2>You Reservation is:</h2>
          {order.rooms.map((room) => (
            <ul className='orderDetails' key={room.number}>
              <li>
                Room Number: <span>{room.number}</span>
              </li>
              <li>
                <span>{room.desc}</span>
              </li>
              <li>
                <span>
                  ${room.price} a night * {days} night(s) = {room.price * days}
                </span>
              </li>
            </ul>
          ))}
          <h2>
            Total to pay is: ${' '}
            {order.rooms.reduce(
              (previousValue, currentValue) =>
                previousValue + currentValue.price,
              0
            ) * days}
          </h2>
          Your accommodation in {order.hotel.name} will be from
          {format(dates[0].startDate, 'dd/MM/yy')} to
          {format(dates[0].endDate, 'dd/MM/yy')}
          <button onClick={handleClick} className='reserveButton'>
            Close and go to home page{' '}
          </button>
        </div>
      </div>
    )
  )
}

export default Confirmation
