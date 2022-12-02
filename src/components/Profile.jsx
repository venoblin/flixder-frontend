import '../styles/Profile.css'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { DeleteProfile } from '../services'
import { TMDB_IMG_BASE } from '../global'
import MovieStack from './MovieStack'

const Profile = () => {
  const { user, currentProfile, resetCurrentProfile, updateProfiles } =
    useContext(UserContext)
  const [profileMovies, setProfileMovies] = useState(null)

  const deleteHandler = async () => {
    await DeleteProfile(currentProfile)
    updateProfiles(user)
    resetCurrentProfile()
  }

  useEffect(() => {
    updateProfiles(user)
      .then(() => {
        setProfileMovies(currentProfile.fav_movies)
      })
      .catch((err) => console.log(err))
  }, [])

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

        <button onClick={deleteHandler}>Delete Profile</button>
      </div>

      <div className="movies">
        {currentProfile.fav_movies ? (
          profileMovies && (
            <MovieStack movies={currentProfile.fav_movies} findMode={false} />
          )
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
