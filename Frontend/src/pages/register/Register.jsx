import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  })
  const navigate = useNavigate()
  const { user, error, dispatch } = useContext(AuthContext)
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL || ''}/api/auth/register`,
        credentials
      )
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      navigate('/')
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIURE', payload: err.response.data })
    }
  }
  useEffect(() => {
    if (user !== null) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <>
      <Navbar />
      <div className='login'>
        <h1 className='logTitle'>Login</h1>
        <form onSubmit={handleClick} className='logForm'>
          <div className='logElement'>
            <label htmlFor='username'>Insert you username</label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='username'
              onChange={handleChange}
              className='logInput'
            />
          </div>
          <div className='logElement'>
            <label htmlFor='username'>Insert you Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='email'
              onChange={handleChange}
              className='logInput'
            />
          </div>
          <div className='logElement'>
            <label htmlFor='password'>Insert your Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='password'
              onChange={handleChange}
              className='logInput'
            />
          </div>
          <button className='logButton'>Register</button>
          {error && <span className='logError'>{error.message}</span>}
        </form>
      </div>
    </>
  )
}

export default Register
