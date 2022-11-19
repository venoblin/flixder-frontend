import '../../styles/Home.css'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const Home = () => {
  const { authenticated } = useContext(UserContext)

  return (
    <div className="Home">
      {authenticated ? <div>Profiles</div> : <div>You are not signed in!</div>}
    </div>
  )
}

export default Home
