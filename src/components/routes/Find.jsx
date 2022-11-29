import '../../styles/Find.css'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { GetTmdbMovies } from '../../services/tmdbServices'
import MovieStack from '../MovieStack'

const Find = () => {
  const { currentProfile } = useContext(UserContext)
  const [movies, setMovies] = useState(null)

  const getMovies = async () => {
    const res = await GetTmdbMovies(currentProfile)
    setMovies(res)
  }

  useEffect(() => {
    getMovies()
  }, [currentProfile])

  return (
    <div className="Find">
      <h1>Find</h1>

      {movies && <MovieStack movies={movies} findMode={true} />}
    </div>
  )
}

export default Find
