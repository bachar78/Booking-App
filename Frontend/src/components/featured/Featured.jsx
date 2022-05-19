import './featured.css'
import useFetch from '../../hooks/useFetch'

const Featured = () => {
  const { data, error, loading } = useFetch(
    '/hotels/countbycity?cities=Dublin,Rio de Janeiro,Buenos Aires'
  )
  if(error) {
    return <p>{error.message}</p>
  }
  return (
    <div className='featured'>
      {loading ? (
        '... is loading'
      ) : (
        <>
          {data &&
            data.map((city, index) => (
              <div className='featuredItem' key={index}>
                <img src={`./images/featured/${index}.jpg`} alt='' />
                <div className='featuredTitle'>
                  <h1>{city.city}</h1>
                  <h2> {city.number} Properties</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  )
}

export default Featured
