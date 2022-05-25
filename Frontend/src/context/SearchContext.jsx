import { createContext, useState } from 'react'

export const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const [destination, setDestination] = useState('')
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  return (
    <SearchContext.Provider
      value={{
        options,
        setOptions,
        destination,
        setDestination,
        dates,
        setDates,
        selectedRooms,
        setSelectedRooms,
        openConfirmation,
        setOpenConfirmation,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
