import '../styles/Profile.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { TMDB_IMG_BASE } from '../global'

const Profile = () => {
  const { currentProfile } = useContext(UserContext)

  return (
    <div className="Profile">
      <div className="profile-card">
        <div className="profile-info">
          <div className="left-wrapper">
            <img
              className="profile-pic"
              src={currentProfile.profile_pic.url}
              alt={`${currentProfile.name} ${currentProfile.profile_pic.name}`}
            />

            <h2>{currentProfile.name}</h2>

            <img
              className="flag"
              src={currentProfile.region.flag_image}
              alt={`${currentProfile.region.name} flag`}
            />
          </div>

          <div className="right-wrapper">
            <div className="genres">
              {currentProfile.fav_genres.map((genre) => (
                <p key={genre._id}>{genre.name}</p>
              ))}
            </div>

            <div className="providers">
              {currentProfile.providers.map((provider) => (
                <img
                  key={provider._id}
                  className="provider-logo"
                  src={`${TMDB_IMG_BASE}${provider.logo_path}`}
                  alt={`${provider.provider_name} logo`}
                />
              ))}
            </div>
          </div>
        </div>

        <Link className="btn" to="/find">
          Find New Movies!
        </Link>
      </div>

      <div className="movies">
        {currentProfile.fav_movies.length ? (
          <div>Movies</div>
        ) : (
          <div>
            <p>You have no movies, start finding new things to watch!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
