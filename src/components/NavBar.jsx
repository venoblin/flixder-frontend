import '../styles/NavBar.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const NavBar = () => {
  const { setUser, authenticated, toggleAuthenticated } =
    useContext(AuthContext)

  const handleLogout = () => {
    setUser(null)
    toggleAuthenticated()
    localStorage.clear()
  }

  return (
    <nav className="NavBar">
      <Link to="/">Flixder</Link>

      <div className="right-wrapper">
        {authenticated ? (
          <div>
            <Link onClick={handleLogout}>Sign Out</Link>
          </div>
        ) : (
          <div>
            <Link to="/login">Log In</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
