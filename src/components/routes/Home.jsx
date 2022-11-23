import '../../styles/Home.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import ProfileSelector from '../ProfileSelector'

const Home = () => {
  const { user, profiles, authenticated } = useContext(UserContext)

  return (
    <div className="Home">
      {authenticated ? (
        <div>
          {profiles && profiles.length ? (
            <ProfileSelector profiles={profiles} />
          ) : (
            <div>
              <p>Create a profile to start searching!</p>
              <Link to="/profiles/new">Create Profile</Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>You are not signed in!</p>
        </div>
      )}
    </div>
  )
}

export default Home
