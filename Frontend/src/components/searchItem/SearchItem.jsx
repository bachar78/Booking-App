import './searchItem.css'
import { rating } from '../featuredProperties/FeaturedProperties'
import { Link } from 'react-router-dom'
const SearchItem = ({ img, hotel }) => {
  return (
    <div className='searchItem'>
      <img src={hotel.photos[0]} alt='' className='siImg' />
      <div className='siDesc'>
        <div className='siDesc'>
          <h1 className='siTitle'>{hotel.name}</h1>
          <span className='siDistance'> {hotel.distance} from center</span>
          <span className='siTaxiOp'>Free airport taxi</span>
          <span className='siSubtitle'>{hotel.desc}</span>
          <span className='siFeatures'>
            Entire studion 1 bathroom 21m2 1 full bed
          </span>
          <span className='siCancelOp'>Free cancellation </span>
          <span className='siCancelOpSubtitle'>
            You can cancel later, so look in this great price today!
          </span>
        </div>
      </div>
      <div className='siDetails'>
        {hotel.rating && (
          <div className='siRating'>
            <span>{rating(hotel.rating)}</span>
            <button>{hotel.rating}</button>
          </div>
        )}
        <div className='siDetailTexts'>
          <span className='siPrice'>${hotel.cheapestPrice}</span>
          <span className='siTaxOp'>Includes Taxes and Fees</span>
          <Link to={`/hotels/${hotel._id}`}>
            <button className='siCheckButton'>See Availability</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
