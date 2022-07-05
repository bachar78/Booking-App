import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import useFetch from '../../hooks/useFetch'

import './reserve.css'
import { useContext } from 'react'
import { SearchContext } from '../../context/SearchContext'
import getDatesInRange from '../../utils/getDatesInRange'
const Reserve = ({ setOpenReserve, hotelId, setConfirmationOpen }) => {
  const { data } = useFetch(`/hotels/rooms/${hotelId}`)
  const { dates, selectedRooms, setSelectedRooms } = useContext(SearchContext)
  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((room) => room !== value)
    )
  }
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    )
    return !isFound
  }
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const id = roomId.split(',')[0]
          const res = await axios.put(
            `${
              process.env.REACT_APP_SERVER_URL || ''
            }/api/rooms/availability/${id}`,
            {
              dates: allDates,
            }
          )
          if (res.data.message === 'reserved') {
            setConfirmationOpen(true)
            setOpenReserve(false)
          }
        })
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className='reserve'>
      <div className='reserveContainer'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='reserveClose'
          onClick={() => {
            setOpenReserve(false)
            setSelectedRooms([])
          }}
        />
        {data.map((room) => (
          <div className='roomItem' key={room._id}>
            <div className='roomInformation'>
              <div className='roomTitle'>{room.title}</div>
              <div className='roomDesc'>{room.desc}</div>
              <div className='roomMax'>
                <b>Max: </b>
                {room.maxPeople} person(s)
              </div>
              <div className='roomPrice'>
                $ <b>{room.price}</b>
              </div>
            </div>
            <div className='roomNumbers'>
              {room.roomNumbers.map((roomNumber) => (
                <div className='room' key={roomNumber._id}>
                  <label htmlFor=''>{roomNumber.number}</label>
                  {!isAvailable(roomNumber) ? (
                    <p className='unavailable'>Unavailable</p>
                  ) : (
                    <input
                      type='checkbox'
                      value={[roomNumber._id, roomNumber.number]}
                      onChange={handleSelect}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className='reserveButton'>
          Reserve{' '}
        </button>
      </div>
    </div>
  )
}

export default Reserve
