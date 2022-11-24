import '../../styles/Home.css'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import ProfileSelector from '../ProfileSelector'
import Finder from '../Finder'

const Home = () => {
  const { profiles, updateProfiles, currentProfile } = useContext(UserContext)

  useEffect(() => {
    updateProfiles()
  }, [])

  return (
    <div className="Home">
      {currentProfile ? (
        <Finder />
      ) : (
        <div>
          {profiles &&
            (profiles.length ? (
              <div>
                <ProfileSelector profiles={profiles} />
                <Link to="/profiles/new">Create Profile</Link>
              </div>
            ) : (
              <div>
                <p>Create a profile to start searching!</p>
                <Link to="/profiles/new">Create Profile</Link>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Home
