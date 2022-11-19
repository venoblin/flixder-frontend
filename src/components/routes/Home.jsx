import '../../styles/Home.css'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const Home = () => {
  const { authenticated } = useContext(AuthContext)

  return (
    <div className="Home">
      {authenticated ? <div>Profiles</div> : <div>You are not signed in!</div>}
    </div>
  )
}

export default Home
