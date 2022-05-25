import './properyList.css'
import useFetch from '../../hooks/useFetch'

const ProperyList = () => {
  const { data, error, loading } = useFetch('/hotels/countbytype')
  return (
    <div className='pList'>
      {loading ? (
        '... is loading'
      ) : (
        <>
          {data &&
            data.map((property, index) => (
              <div className='pListItem' key={index}>
                <img src={`./images/properties/${index}.jpg`} alt='' />
                <div className='pListTitle'>
                  <h1>{property.type}</h1>
                  <h2>{property.number} hotels</h2>
                </div>
              </div>
            ))}
        </>
      )}
      {/* 
      <div className='pListItem'>
        <img src='./images/properties/2.jpg' alt='' />
        <div className='pListTitle'>
          <h1>Villas</h1>
          <h2>233 hotels</h2>
        </div>
      </div>
      <div className='pListItem'>
        <img src='./images/properties/3.jpg' alt='' />
        <div className='pListTitle'>
          <h1>Cabins</h1>
          <h2>2331 hotels</h2>
        </div>
      </div>
      <div className='pListItem'>
        <img src='./images/properties/4.jpg' alt='' />
        <div className='pListTitle'>
          <h1>Apartments</h1>
          <h2>2331 hotels</h2>
        </div>
      </div>
      <div className='pListItem'>
        <img src='./images/properties/5.jpg' alt='' />
        <div className='pListTitle'>
          <h1>Resorts</h1>
          <h2>2331 hotels</h2>
        </div>
      </div> */}
    </div>
  )
}

export default ProperyList
