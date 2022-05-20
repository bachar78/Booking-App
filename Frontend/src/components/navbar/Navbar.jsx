import './navbar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span className='logo' onClick={() => navigate('/')}>
          Full Life
        </span>
        <div className='navItems'>
          {user !== null ? (
            <>
                <button className='navButton'>Logout</button>
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
