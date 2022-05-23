import { createContext, useReducer, useState } from 'react'

const INITIAL_STATE = {}

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_SEARCH':
      return action.payload
    case 'RESET_SEARCH':
      return INITIAL_STATE
    default:
      return state
  }
}

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)
  const [destination, setDestination] = useState('')
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
        state,
        dispatch,
        options,
        setOptions,
        destination,
        setDestination,
        dates,
        setDates,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
