import { createContext, useEffect, useReducer } from 'react'

const INITIAL_STATE = {
  order: null,
  loading: false,
  error: null,
}

export const OrderContext = createContext(INITIAL_STATE)

const OrderReducer = (state, action) => {
  switch (action.type) {
    case 'ORDER_SUCCESS':
      return {
        order: action.payload,
        loading: false,
        error: null,
      }
    case 'ORDER_FAILURE':
      return {
        order: null,
        loading: false,
        error: action.payload,
      }
    case 'ORDER_RESET':
      return {
        order: {},
        loading: false,
        error: null,
      }
    default:
      return state
  }
}

export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, INITIAL_STATE)
  return (
    <OrderContext.Provider
      value={{
        order: state.order,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
