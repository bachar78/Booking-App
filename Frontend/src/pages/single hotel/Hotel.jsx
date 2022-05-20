import './hotel.css'
import { useState, useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import photos from '../../assets/photos'
import Footer from '../../components/footer/Footer'
import MailList from '../../components/mailList/MailList'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { dayDifference } from '../../utils/dayDifference'

const Hotel = () => {
  const { dates, options } = useContext(SearchContext)
  const days = dayDifference(dates[0].endDate, dates[0].startDate)
  const { id } = useParams()
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
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
  return (
    <div className=''>
      <Navbar />
      <Header type='list' />
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
              <img
                src={data.photos[slideNumber]}
                alt=''
                className='sliderImg'
              />
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
                <button className='bookNow'>Book Now!</button>
                <h1 className='hotelTitle'>{data.name}</h1>
                <div className='hotelAddress'>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data.address}</span>
                </div>
                <span className='hotelDistance'>
                  Excellent location - {data.distance} from center
                </span>
                <span className='hotelPriceHighlight'>
                  Book a stay over $ {data.cheapestPrice} at this property and
                  get a free airport taxi
                </span>
                <div className='hotelImages'>
                  {data.photos &&
                    data.photos.map((image, index) => (
                      <div key={index} className='hotelImgWrapper'>
                        <img
                          onClick={() => openHandler(index)}
                          src={image}
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
                    <button>Reserve or Book Now!</button>
                  </div>
                </div>
              </div>
            )}
      </div>
      <MailList />
      <Footer />
    </div>
  )
}

export default Hotel
