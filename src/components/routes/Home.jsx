import '../../styles/Home.css'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import ProfileSelector from '../ProfileSelector'
import Profile from '../Profile'

const Home = () => {
  const { currentProfile } = useContext(UserContext)

  return (
    <div className="Home">
      {currentProfile ? (
        <Profile />
      ) : (
        <div>
          <ProfileSelector />
          <Link className="btn" to="/profiles/new">
            Create Profile
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home
