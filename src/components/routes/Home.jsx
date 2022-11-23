import '../../styles/Home.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import ProfileSelector from '../ProfileSelector'

const Home = () => {
  const { user, profiles, selectedProfile, authenticated } =
    useContext(UserContext)

  return (
    <div className="Home">
      {authenticated ? (
        <div>
          {profiles && profiles.length ? (
            selectedProfile ? (
              <div>Finder</div>
            ) : (
              <div>
                <ProfileSelector profiles={profiles} />
                <Link to="/profiles/new">Create Profile</Link>
              </div>
            )
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
