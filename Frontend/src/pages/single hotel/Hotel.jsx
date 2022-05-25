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
import { dayDifference } from '../../utils/dayDifference'


const Hotel = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { dates, options, destination, openConfirmation } = useContext(SearchContext)
  const days = dayDifference(dates[0].endDate, dates[0].startDate)
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
  const { data, error, loading } = useFetch(id ? `/hotels/${id}` : '/hotels')

  if (error) {
    return (
      <h1 className='error'>
        Some thing went wrong <span>{error?.message}</span>
        <Link to='/'>Go Back to Home Page</Link>
      </h1>
    )
  }
  const handleClick = () => {
    if (user) {
      setOpenReserve(true)
    } else {
      navigate('/login')
    }
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
                    <h1>Perfect for a {days}-night stay!</h1>
                    <span>
                      Located in the real heart of Krakow, this property has an
                      excellent location score of 9.8!
                    </span>
                    <h2>
                      $<b>{data.cheapestPrice}</b> * <b>{days}</b> night *{' '}
                      <b>{options.room}</b> room(s)
                    </h2>
                    <h2>
                      $<b>{data.cheapestPrice * days * options.room}</b>
                    </h2>
                    <button onClick={handleClick}>Reserve</button>
                  </div>
                </div>
              </div>
            )}
      </div>
      <Footer />
      {openReserve && <Reserve hotelId={id} setOpenReserve={setOpenReserve} />}
      {openConfirmation && <Confirmation hotelId={id}/>}
    </div>
  )
}

export default Hotel
