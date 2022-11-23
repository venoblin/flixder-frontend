import '../styles/NavBar.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const NavBar = () => {
  const {
    setUser,
    profiles,
    currentProfile,
    authenticated,
    toggleAuthenticated,
    handleLogout
  } = useContext(UserContext)

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
            <Link to="/login">Sign In</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
