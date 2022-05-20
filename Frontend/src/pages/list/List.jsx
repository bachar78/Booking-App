import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { format } from 'date-fns'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { DateRange } from 'react-date-range'
import './list.css'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'

const List = () => {
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { error, data, loading, reFetch } = useFetch(
    `/hotels?city=${destination}`
  )

  if (error) {
    return (
      <h1 className='error'>
        Some thing went wrong <span>{error?.message}</span>
        <Link to='/'>Go Back to Home Page</Link>
      </h1>
    )
  }
  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label>Destination</label>
              <input
                type='text'
                placeholder={destination}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className='lsItem'>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {' '}
                {format(dates[0].startDate, 'dd/MM/yy')} to
                {format(dates[0].endDate, 'dd/MM/yy')}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Min Price <small>per night</small>
                  </span>
                  <input
                    type='number'
                    className='lsOptionInput'
                    min='1'
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Max Price <small>per night</small>
                  </span>
                  <input
                    type='number'
                    className='lsOptionInput'
                    min='1'
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Adult</span>
                  <input
                    type='number'
                    className='lsOptionInput'
                    placeholder={options.adult}
                    min='1'
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Children</span>
                  <input
                    type='number'
                    className='lsOptionInput'
                    placeholder={options.children}
                    min='0'
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Room</span>
                  <input
                    type='number'
                    className='lsOptionInput'
                    placeholder={options.room}
                    min='1'
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                reFetch(
                  `/hotels?city=${destination}&min=${min || 1}&max=${
                    max || 2000
                  }`
                )
              }
            >
              Search
            </button>
          </div>
          <div className='listResult'>
            {loading
              ? '...is loading'
              : data &&
                data.map((hotel) => (
                  <SearchItem hotel={hotel} img='1' key={hotel._id} />
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
