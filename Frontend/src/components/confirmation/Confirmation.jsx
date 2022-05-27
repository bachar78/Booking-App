import './confirmation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { useContext, useEffect } from 'react'
import { SearchContext } from '../../context/SearchContext'
import { useNavigate } from 'react-router-dom'

const Confirmation = ({ hotelId }) => {
  const { selectedRooms, setSelectedRooms, dates, setOpenConfirmation } =
    useContext(SearchContext)
  console.log(selectedRooms)
  const navigate = useNavigate()
  const handleClick = () => {
    setOpenConfirmation(false)

    navigate('/')
  }
  useEffect(() => {
    // eslint-disable-next-line
    ;(async () => {
      const newSelectedRoom = selectedRooms.map((room) => ({
        id: room.split(',')[0],
        number: room.split(',')[1],
      }))
      const res = await axios.post(`/rooms/confirmation/${hotelId}`, {
        rooms: newSelectedRoom,
        dates,
      })
      if (res.data) {
        setSelectedRooms([])
      }
    })()
  }, [dates, hotelId, setSelectedRooms])
  
  return (
    <div>
      <div className='reserve'>
        <div className='reserveContainer'>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className='reserveClose'
            onClick={() => setOpenConfirmation(false)}
          />
          <span>You Reserved the following room(s): </span>

          <button onClick={handleClick} className='reserveButton'>
            Close and go to home page{' '}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
