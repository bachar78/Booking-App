import './featured.css'

const Featured = () => {
  return (
    <div className='featured'>
      <div className="featuredItem">
        <img src="./images/featured/dublin.jpg" alt="" />
        <div className="featuredTitle">
          <h1>Dublin</h1>
          <h2>123 Properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="./images/featured/rio.jpg" alt="" />
        <div className="featuredTitle">
          <h1>Rio de Janeiro</h1>
          <h2>662 Properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="./images/featured/buenos.jpg" alt="" />
        <div className="featuredTitle">
          <h1>Buenos Aires</h1>
          <h2>598 Properties</h2>
        </div>
      </div>
    </div>
  )
}

export default Featured
