import './header.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' //? main css file
import 'react-date-range/dist/theme/default.css' //? theme css file
import { format } from 'date-fns'
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons'
const Header = ({type}) => {
  const [openDate, setOpenDate] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
    }))
  }
  return (
    <div className='header'>
      <div className='headerContainer'>
        <div className='headerList'>
          <div className='headerListItem active'>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
      { type !== "list" && <>
          <h1 className='headerTitle'>A liftime of discounts? It's Genius.</h1>
          <p className='headerDesc'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam dolor
            a quidem tempora suscipit reiciendis maxime odio fuga, .
          </p>
          <button className='headerBtn'>Sign in / Register</button>
          <div className='headerSearch'>
            <div className='headerSearchItem'>
              <FontAwesomeIcon icon={faBed} className='headerIcon' />
              <input
                type='text'
                placeholder='Where are you going?'
                className='headerSearchInput'
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
              >{`${format(date[0].startDate, 'dd/MM/yy')} to ${format(
                date[0].endDate,
                'dd/MM/yy'
              )}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className='date'
                />
              )}
            </div>
            <div className='headerSearchItem'>
              <FontAwesomeIcon icon={faPerson} className='headerIcon' />
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className='headerSearchText'
              >{`${options.adult} Adul(s) . ${options.children} child(ren) . ${options.room} room(s)`}</span>
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
                      <span className='optionCounterNumber'>
                        {options.adult}
                      </span>
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
                      <span className='optionCounterNumber'>
                        {options.room}
                      </span>
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
            </div>
            <div className='headerSearchItem'>
              <button className='headerBtn'>Search</button>
            </div>
          </div>
        </>}
      </div>
    </div>
  )
}

export default Header
