import axios from 'axios'
import { useState, useEffect } from 'react'
const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL || ''}/api${url}`
        )
        setData(res.data)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    })()
  }, [url])

  const reFetch = async (url) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL || ''}/api${url}`
      )
      setData(res.data)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  return { data, error, loading, reFetch }
}

export default useFetch
