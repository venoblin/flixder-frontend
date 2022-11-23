import '../styles/ProfileSelector.css'

const ProfileSelector = (props) => {
  return (
    <div className="ProfileSelector">
      <h1>Select a profile!</h1>

      <div className="profiles">
        {props.profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
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
