import '../styles/NavBar.css'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const NavBar = (props) => {
  const { profiles, currentProfile, updateCurrentProfile, handleLogout } =
    useContext(UserContext)
  let navigate = useNavigate()

  const toggleDropDown = () => {
    props.toggleIsShowing()
  }

  const profileSwitchHandler = (profile) => {
    updateCurrentProfile(profile)
    toggleDropDown()
    navigate('/')
  }

  return (
    <nav className="NavBar">
      <Link className="link home logo" to="/">
        Flixder
      </Link>
      
      <div className="right-wrapper">
        

        {currentProfile && profiles.length ? (
          <div className="profile-switcher">
            <div className="current profile" onClick={toggleDropDown}>
              <img
                src={currentProfile.profile_pic.url}
                alt={`${currentProfile.name} ${currentProfile.profile_pic.name}`}
                ref={props.profileSwitcherRef}
              />
            </div>

            {props.isShowing &&
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
                  <Link onClick={toggleDropDown} className="link" to="/profiles/new">
                    Create Profile
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Sign Out
                  </Link>
                </div>
              </div>
            }
          </div>
        ) : (
          <div>
            <Link className="link" onClick={handleLogout}>
              Sign Out
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
