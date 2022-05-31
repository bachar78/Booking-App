import './header.css'
import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' //? main css file
import 'react-date-range/dist/theme/default.css' //? theme css file
// import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import {
  faBed,
  faCalendarDays,
  faPerson,
} from '@fortawesome/free-solid-svg-icons'
import capitalizeFirstLetter from '../../utils/capitale'

const Header = () => {
  const [openDate, setOpenDate] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)

  const navigate = useNavigate()
  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
    }))
  }
  const { options, setOptions, destination, setDestination, dates, setDates } =
    useContext(SearchContext)

  const handleSearch = () => {
    if (destination === '') {
      return
    }
    navigate('/hotels')
  }
  return (
    <div className='header'>
      <div className='headerContainer'>
        <h1 className='headerTitle'>
          Insert your destination and we will find the best options{' '}
          <b>FOR YOU</b>{' '}
        </h1>
        <div className='headerSearch'>
          <div className='headerSearchItem'>
            <FontAwesomeIcon icon={faBed} className='headerIcon' />
            <input
              type='text'
              placeholder='Insert destination'
              className='headerSearchInput'
              onChange={(e) =>
                setDestination(capitalizeFirstLetter(e.target.value))
              }
            />
          </div>
          <div className='headerSearchItem'>
            <FontAwesomeIcon
              icon={faCalendarDays}
              className='headerIcon'
              onClick={() => setOpenDate(!openDate)}
            />
            <span
              onClick={() => setOpenDate(!openDate)}
              className='headerSearchText'
            >
              Define dates
            </span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className='date'
                minDate={new Date()}
              />
            )}
          </div>
          {/* <div className='headerSearchItem'>
            <FontAwesomeIcon icon={faPerson} className='headerIcon' />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className='headerSearchText'
            >{`${options.adult} Adult(s) . ${options.children} child(ren) . ${options.room} room(s)`}</span>
            {openOptions && (
              <div className='options'>
                <div className='optionItem'>
                  <span className='optionText'>Adult</span>
                  <div className='optionCounter'>
                    <button
                      disabled={options.adult <= 1}
                      onClick={() => handleOption('adult', 'd')}
                      className='optionCounterButton'
                    >
                      -
                    </button>
                    <span className='optionCounterNumber'>{options.adult}</span>
                    <button
                      onClick={() => handleOption('adult', 'i')}
                      className='optionCounterButton'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='optionItem'>
                  <span className='optionText'>Children</span>
                  <div className='optionCounter'>
                    <button
                      disabled={options.children <= 0}
                      onClick={() => handleOption('children', 'd')}
                      className='optionCounterButton'
                    >
                      -
                    </button>
                    <span className='optionCounterNumber'>
                      {options.children}
                    </span>
                    <button
                      onClick={() => handleOption('children', 'i')}
                      className='optionCounterButton'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='optionItem'>
                  <span className='optionText'>Room</span>
                  <div className='optionCounter'>
                    <button
                      disabled={options.room <= 1}
                      onClick={() => handleOption('room', 'd')}
                      className='optionCounterButton'
                    >
                      -
                    </button>
                    <span className='optionCounterNumber'>{options.room}</span>
                    <button
                      onClick={() => handleOption('room', 'i')}
                      className='optionCounterButton'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div> */}
          <div className='headerSearchItem'>
            <button className='headerBtn' onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
