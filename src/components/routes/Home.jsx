import '../../styles/Home.css'
import { useContext } from 'react'
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
        <ProfileSelector />
      )}
    </div>
  )
}

export default Home
