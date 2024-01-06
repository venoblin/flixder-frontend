import '../styles/ProfileSelector.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const ProfileSelector = () => {
  const { profiles, updateCurrentProfile } = useContext(UserContext)

  return (
    <div className="ProfileSelector">
      {profiles.length ? (
        <div>
          <h1>Select a profile!</h1>

          <div className="profiles">
          {profiles.map((profile) => (
              <div
              key={profile._id}
              className="profile-card"
              onClick={() => updateCurrentProfile(profile)}
              >
                <img
                src={profile.profile_pic.url}
                alt={`${profile.name} ${profile.profile_pic.name}`}
                />

                <p className='profile-name'>{profile.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Create a profile to start searching!</p>
      )}

      <Link className="btn" to="/profiles/new">
        Create Profile
      </Link>
    </div>
  )
}

export default ProfileSelector
