import './featuredProperties.css'
import useFetch from '../../hooks/useFetch'

const FeaturedProperties = () => {
  const { error, loading, data } = useFetch('/hotels?featured=true&limit=4')
  return (
    <div className='fp'>
      {loading ? (
        '... is loading'
      ) : (
        <>
          {data &&
            data.map((property, index) => (
              <div className='fpItem' key={index}>
                <img
                  src={property.photos.length!==0?property.photos[0]:`./images/fb/${index}.jpg`}
                  alt=''
                  className='fbImg'
                />
                <span className='fpName'>{property.name}</span>
                <span className='fpCity'>{property.city}</span>
                <span className='fpPrice'>
                  Starting from {property.cheapestPrice}$
                </span>
                <div className='fpRating'>
                  <button>8.9</button>
                  <span>Excellent</span>
                </div>
              </div>
            ))}
        </>
      )}
      {/* <div className='fpItem'>
        <img src='./images/fb/5.jpg' alt='' className='fbImg' />
        <span className='fpName'>Aparthotel Stare Miasto</span>
        <span className='fpCity'>Madrid</span>
        <span className='fpPrice'>Starting from 120$</span>
        <div className='fpRating'>
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className='fpItem'>
        <img src='./images/fb/2.jpg' alt='' className='fbImg' />
        <span className='fpName'>Aparthotel Stare Miasto</span>
        <span className='fpCity'>Madrid</span>
        <span className='fpPrice'>Starting from 120$</span>
        <div className='fpRating'>
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className='fpItem'>
        <img src='./images/fb/3.jpg' alt='' className='fbImg' />
        <span className='fpName'>Aparthotel Stare Miasto</span>
        <span className='fpCity'>Madrid</span>
        <span className='fpPrice'>Starting from 120$</span>
        <div className='fpRating'>
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className='fpItem'>
        <img src='./images/fb/4.jpg' alt='' className='fpImg' />
        <span className='fpName'>Aparthotel Stare Miasto</span>
        <span className='fpCity'>Madrid</span>
        <span className='fpPrice'>Starting from 120$</span>
        <div className='fpRating'>
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div> */}
    </div>
  )
}

export default FeaturedProperties
