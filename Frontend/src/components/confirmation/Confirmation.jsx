import './confirmation.css'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { SearchContext } from '../../context/SearchContext'
import { OrderContext } from '../../context/OrderContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Confirmation = ({ hotelId }) => {
  const {
    selectedRooms,
    setSelectedRooms,
    dates,
    setOpenConfirmation,
    setOpenDate
  } = useContext(SearchContext)
  const { order, error, loading, dispatch } = useContext(OrderContext)

  const navigate = useNavigate()
  const handleClick = () => {
    dispatch({ type: 'ORDER_RESET' })
    setOpenConfirmation(false)
    navigate('/')
  }
  useEffect(() => {
    ;(async () => {
      dispatch({ type: 'ORDER_START' })
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
          {setOpenDate(true)}
        </h1>
      </div>
    )
  }
  return (
    <div>
      {' '}
      {loading ? (
        '... is loading'
      ) : (
        <div className='reserve'>
          <div className='reserveContainer'>
            <span>You Reserved the following room(s): </span>

            <button onClick={handleClick} className='reserveButton'>
              Close and go to home page{' '}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Confirmation
