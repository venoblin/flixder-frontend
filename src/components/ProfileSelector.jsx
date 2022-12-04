import '../styles/ProfileSelector.css'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const ProfileSelector = (props) => {
  const { profiles, updateCurrentProfile } = useContext(UserContext)

  return (
    <div className="ProfileSelector">
      {profiles.length ? (
        <h1>Select a profile!</h1>
      ) : (
        <p>Create a profile to start searching!</p>
      )}

      <div className="profiles">
        {profiles &&
          profiles.map((profile) => (
            <div
              key={profile._id}
              className="profile-card"
              onClick={() => updateCurrentProfile(profile)}
            >
              <img
                src={profile.profile_pic.url}
                alt={`${profile.name} ${profile.profile_pic.name}`}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default ProfileSelector
