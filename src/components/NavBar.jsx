import '../styles/NavBar.css'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const NavBar = (props) => {
  const { profiles, currentProfile, updateCurrentProfile, handleLogout } =
    useContext(UserContext)
  let navigate = useNavigate()

  const toggleDropDown = () => {
    const dropdown = document.querySelector('.drop-down')

    dropdown.classList.toggle('show')
  }

  const profileSwitchHandler = (profile) => {
    updateCurrentProfile(profile)
    toggleDropDown()
    navigate('/')
  }

  return (
    <nav className="NavBar">
      <Link to="/">Flixder</Link>

      <div className="right-wrapper">
        {currentProfile && profiles && (
          <div className="profile-switcher">
            <div className="current profile" onClick={toggleDropDown}>
              <img
                src={currentProfile.profile_pic.url}
                alt={`${currentProfile.name} ${currentProfile.profile_pic.name}`}
              />
            </div>

            <div className="drop-down">
              {profiles.map(
                (profile) =>
                  profile._id !== currentProfile._id && (
                    <div
                      key={profile._id}
                      className="profile"
                      onClick={() => profileSwitchHandler(profile)}
                    >
                      <img
                        src={profile.profile_pic.url}
                        alt={`${profile.name} ${profile.profile_pic.name}`}
                      />
                    </div>
                  )
              )}

              <div className="links">
                <Link to="/profiles/new">Create Profile</Link>
                <Link onClick={handleLogout}>Sign Out</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
