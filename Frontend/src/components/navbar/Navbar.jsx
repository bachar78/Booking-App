import './navbar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext)
  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('user')
  }
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span className='logo' onClick={() => navigate('/')}>
          Full{' '}
          <img className='logoImg' src='../images/logo.png' alt='logo'></img> Life
        </span>
        <div className='navItems'>
          {user !== null ? (
            <>
              <button onClick={logoutHandler} className='navButton'>
                Logout
              </button>
              <button className='navButton'>{user.username}</button>
            </>
          ) : (
            <>
              <Link to='/register'>
                <button className='navButton'>Register</button>
              </Link>
              <Link to='/login'>
                <button className='navButton'>Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
