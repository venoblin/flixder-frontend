import '../../styles/Home.css'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import ProfileSelector from '../ProfileSelector'
import Profile from '../Profile'

const Home = () => {
  const { profiles, currentProfile } = useContext(UserContext)

  return (
    <div className="Home">
      {currentProfile ? (
        <Profile />
      ) : (
        <div>
          {profiles ? (
            <div>
              <ProfileSelector profiles={profiles} />
              <Link to="/profiles/new">Create Profile</Link>
            </div>
          ) : (
            <div>
              <p>Create a profile to start searching!</p>
              <Link to="/profiles/new">Create Profile</Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
