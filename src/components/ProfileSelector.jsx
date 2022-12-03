import '../styles/ProfileSelector.css'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const ProfileSelector = (props) => {
  const { updateCurrentProfile } = useContext(UserContext)

  return (
    <div className="ProfileSelector">
      {props.profile ? (
        <h1>Select a profile!</h1>
      ) : (
        <p>Create a profile to start searching!</p>
      )}

      <div className="profiles">
        {props.profile &&
          props.profiles.map((profile) => (
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
