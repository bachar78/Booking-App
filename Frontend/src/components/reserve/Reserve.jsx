import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './reserve.css'

const Reserve = ({ setOpenReserve, hotelId }) => {
  return (
    <div className='reserve'>
      <div className='reserveContainer'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='reserveClose'
          onClick={() => setOpenReserve(false)}
        />
        <span>Serlect you rooms: </span>
      </div>
    </div>
  )
}

export default Reserve
