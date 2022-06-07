import './hotel.css'
import { useState, useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Reserve from '../../components/reserve/Reserve'
import Confirmation from '../../components/confirmation/Confirmation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import photos from '../../assets/photos'
import Footer from '../../components/footer/Footer'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'

const Hotel = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { destination } = useContext(SearchContext)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const { id } = useParams()
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openReserve, setOpenReserve] = useState(false)
  const openHandler = (index) => {
    setSlideNumber(index)
    setOpen(true)
  }
  const slideHandler = (direction) => {
    if (direction === 'left') {
      setSlideNumber((prev) => prev - 1)
      if (slideNumber === 0) {
        setSlideNumber(photos.length - 1)
      }
    } else {
      setSlideNumber((prev) => prev + 1)
      if (slideNumber === photos.length - 1) {
        setSlideNumber(0)
      }
    }
  }
  const { data, error, loading } = useFetch(id ? `/hotels/${id}` : `/hotels`)

  const handleClick = () => {
    if (user) {
      setOpenReserve(true)
    } else {
      navigate('/login')
    }
  }
  if (error) {
    return (
      <h1 className='error'>
        Some thing went wrong <span>{error?.message}</span>
        <Link to='/'>Go Back to Home Page</Link>
      </h1>
    )
  }
  return (
    <div className=''>
      <Navbar />
      <div className='hotelContainer'>
        {open && (
          <div className='slider'>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className='close'
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className='arrow'
              onClick={() => slideHandler('left')}
            />
            <div className='sliderWrapper'>
              <img src={photos[slideNumber].src} alt='' className='sliderImg' />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className='arrow'
              onClick={() => slideHandler('right')}
            />
          </div>
        )}
        {loading
          ? '...is loading'
          : data && (
              <div className='hotelWrapper'>
                <h1 className='hotelTitle'>{data.name}</h1>
                <div className='hotelAddress'>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>
                    {data.address} - {destination}
                  </span>
                </div>
                <span className='hotelDistance'>
                  Excellent location - {data.distance} from center
                </span>
                <span className='hotelPriceHighlight'>
                  Book a stay over $ {data.cheapestPrice} at this property and
                  get a free airport taxi
                </span>
                <div className='hotelImages'>
                  {photos.map((image, index) => (
                    <div key={index} className='hotelImgWrapper'>
                      <img
                        onClick={() => openHandler(index)}
                        src={image.src}
                        alt=''
                      />
                    </div>
                  ))}
                </div>
                <div className='hotelDetails'>
                  <div className='hotelDetailsTexts'>
                    <h1 className='hotelTitle'>
                      {data.title
                        ? data.title
                        : 'Stay in our Hotel and enjoy our hosting'}
                    </h1>
                    <p className='hotelDesc'>
                      {data.desc?.length > 1000
                        ? data.desc
                        : "Located a 5-minute walk from St. Florian's Gate in Krakow, Tower Street Apartments has accommodations with air conditioning and microwave, a flat-screen TV, and a private bathroom with shower an interest near the apartment include Cloth Hall, Main Market Square and Town Hall Tower. The nearest airport is John Paul II International Kraków–Balice, 16.1 km from Tower Street Apartments, and the property offers a paid airport shuttle service."}
                    </p>
                  </div>
                  <div className='hotelDetailsPrice'>
                    <button onClick={handleClick}>Reserve</button>
                  </div>
                </div>
              </div>
            )}
      </div>
      <Footer />
      {openReserve && (
        <Reserve
          hotelId={id}
          setOpenReserve={setOpenReserve}
          setConfirmationOpen={setConfirmationOpen}
        />
      )}
      {confirmationOpen && (
        <Confirmation setOpenConfirmation={setConfirmationOpen} hotelId={id} />
      )}
    </div>
  )
}

export default Hotel
