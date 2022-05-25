import './confirmation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import useFetch from '../../hooks/useFetch'
import { useContext } from 'react'
import { SearchContext } from '../../context/SearchContext'
import getDatesInRange from '../../utils/getDatesInRange'

const Confirmation = ({ hotelId }) => {
  const { selectedRooms, dates, setOpenConfirmation } =
    useContext(SearchContext)
  return <div>Confirmation</div>
}

export default Confirmation
