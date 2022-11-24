import '../styles/Finder.css'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { GetTmdbMovies } from '../services/tmdbServices'

const Finder = () => {
  const { currentProfile } = useContext(UserContext)
  const [movies, setMovies] = useState(null)

  const getMovies = async () => {
    const res = await GetTmdbMovies(currentProfile)
    setMovies(res)
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="Finder">
      <h1>Finder</h1>
    </div>
  )
}

export default Finder
