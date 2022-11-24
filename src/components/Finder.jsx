import '../styles/Finder.css'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { GetTmdbMovies } from '../services/tmdbServices'
import MovieCard from './MovieCard'

const Finder = () => {
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
    <div className="Finder">
      <h1>Finder</h1>

      {movies &&
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  )
}

export default Finder
