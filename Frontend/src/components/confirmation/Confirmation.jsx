import './confirmation.css'
import axios from 'axios'
import { useContext, useEffect, useRef } from 'react'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import { OrderContext } from '../../context/OrderContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { dayDifference } from '../../utils/dayDifference'
const Confirmation = ({ hotelId, setOpenConfirmation }) => {
  const { dates, selectedRooms, setSelectedRooms } = useContext(SearchContext)
  const { order, error, loading, dispatch } = useContext(OrderContext)
  const { user } = useContext(AuthContext)
  const days = dayDifference(dates[0].endDate, dates[0].startDate)
  const navigate = useNavigate()
  const handleClick = () => {
    setOpenConfirmation(false)
    navigate('/')
  }
  const formedDates = {
    startDate: format(dates[0].startDate, 'dd/MM/yy'),
    endDate: format(dates[0].endDate, 'dd/MM/yy'),
  }

  const newSelectedRoom = selectedRooms.map((room) => ({
    id: room.split(',')[0],
    number: room.split(',')[1],
  }))
  const executedRef = useRef(false)
  useEffect(() => {
    if (executedRef.current) {
      return
    }
    ;(async () => {
      try {
        const res = await axios.post(
          `${
            process.env.REACT_APP_SERVER_URL || ''
          }/api/rooms/confirmation/${hotelId}`,
          {
            rooms: newSelectedRoom,
            dates: formedDates,
            userInf: { username: user.username, email: user.email },
          }
        )
        dispatch({ type: 'ORDER_SUCCESS', payload: res.data })
        setSelectedRooms([])
      } catch (err) {
        dispatch({ type: 'ORDER_FAILURE', payload: err.response.data })
      }
    })()
    executedRef.current = true
  }, [dispatch, hotelId])

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

  return (
    order && (
      <div className='order'>
        <div className='orderContainer'>
          <h2 className='orderName'>
            Thank you mr(s) <span>{order.user}</span> for choosing{' '}
            <b>Full Life</b> for your booking
          </h2>
          <h3 className='orderDetails'>
            You have just reserved in{' '}
            <span>
              {order.hotel.name}-{order.hotel.type}
            </span>{' '}
            in{' '}
            <span>
              {order.hotel.address}-{order.hotel.city}
            </span>
          </h3>
          <h2>Your Reservation:</h2>
          {order.rooms.map((room) => (
            <ul className='orderRooms' key={room.number}>
              <li>
                <b>Room:</b> {room.number}
              </li>
              <li>{room.desc}</li>
              <li>
                ${room.price} a night * {days} night(s) = {room.price * days}
              </li>
            </ul>
          ))}
          <h2 className='totalPay'>
            <b style={{ margin: '1rem' }}>Total to Pay:</b>
            <span>
              $
              {order.rooms.reduce(
                (previousValue, currentValue) =>
                  previousValue + currentValue.price,
                0
              ) * days}
            </span>
          </h2>
          <h2 className='accommodation'>
            Your accommodation in <b>{order.hotel.name}</b> will be{' '}
            <span>
              <b style={{ color: 'red', margin: '1rem' }}>From</b>
              {format(dates[0].startDate, 'dd/MM/yy')}
              <b style={{ color: 'red', margin: '1rem' }}>To</b>
              {format(dates[0].endDate, 'dd/MM/yy')}
            </span>
          </h2>
          <button onClick={handleClick} className='reserveButton'>
            Close and go to home page{' '}
          </button>
        </div>
      </div>
    )
  )
}

export default Confirmation
