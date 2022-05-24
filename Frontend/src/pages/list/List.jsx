import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { format } from 'date-fns'
import { useState, useContext } from 'react'
import { SearchContext } from '../../context/SearchContext'
import { DateRange } from 'react-date-range'
import './list.css'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'

const List = () => {
  const [openDate, setOpenDate] = useState(false)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  const {
    options,
    setOptions,
    destination,
    setDestination,
    dates,
    setDates,
  } = useContext(SearchContext)

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
  const handleOptions = (e) => {
    setOptions((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
                placeholder='Insert Ddestination'
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
                    placeholder='Adult(s)'
                    min='1'
                    name='adult'
                    onChange={handleOptions}
                    value={options.adult}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Children</span>
                  <input
                    type='number'
                    className='lsOptionInput'
                    placeholder={options.children}
                    min='0'
                    name='children'
                    onChange={handleOptions}
                    value={options.children}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Room</span>
                  <input
                    type='number'
                    className='lsOptionInput'
                    placeholder={options.room}
                    min='1'
                    name='room'
                    onChange={handleOptions}
                    value={options.room}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                reFetch(
                  `/hotels?city=${destination}&min=${min || 1}&max=${
                    max || 2000
                  }`
                )
              }}
            >
              Search
            </button>
          </div>
          <div className='listResult'>
            {loading
              ? '...is loading'
              : data &&
                data.map((hotel, index) => (
                  <SearchItem hotel={hotel} img={index} key={hotel._id} />
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
