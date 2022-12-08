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

  const deleteHandler = async () => {
    await DeleteProfile(currentProfile)
    updateProfiles(user)
    resetCurrentProfile()
  }

  useEffect(() => {
    updateProfiles(user)
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

            <p className="name">{currentProfile.name}</p>

            <img
              className="flag"
              src={currentProfile.region.flag_image}
              alt={`${currentProfile.region.name} flag`}
            />
          </div>

          <div className="right-wrapper">
            <div className="genres">
              {currentProfile.fav_genres.map((genre, i) => (
                <div key={i}>
                  <p>{genre.name}</p>
                </div>
              ))}
            </div>

            <div className="providers">
              {currentProfile.providers.map((provider, i) => (
                <div key={i}>
                  <img
                    className="provider-logo"
                    src={`${TMDB_IMG_BASE}${provider.logo_path}`}
                    alt={`${provider.provider_name} logo`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="inputs">
          <Link className="btn" to="/find">
            Find New Movies
          </Link>

          <button className="danger" onClick={deleteHandler}>
            Delete Profile
          </button>
        </div>
      </div>

      <div className="movies">
        <MovieStack movies={currentProfile.fav_movies} findMode={false} />
      </div>
    </div>
  )
}

export default Profile
