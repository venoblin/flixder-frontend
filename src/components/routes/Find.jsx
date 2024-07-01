import '../../styles/Find.css'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { GetTmdbMovies } from '../../services/tmdbServices'
import { UtilitiesContext } from '../../contexts/UtilitiesContext'
import MovieCard from '../MovieCard'

const Find = () => {
  const utilitiesContext = useContext(UtilitiesContext)
  const { currentProfile } = useContext(UserContext)
  const [movies, setMovies] = useState([])

  const getMovies = async () => {
    try {
      const res = await utilitiesContext.load(GetTmdbMovies(currentProfile))
      if (res.length <= 0) {
        getMovies()
      }
      setMovies([...res])
    } catch {
      utilitiesContext.showPopUp('Error in getting movies!')
    }
  }

  const removeMovie = (movieToRemove) => {
    const newMovies = movies.filter(
      (movie) => movie.id !== movieToRemove.id
    )

    setMovies([...newMovies])
  }

  useEffect(() => {
    getMovies()
  }, [currentProfile])

  return (
    <div className="Find">

      <div className='movies-container'>
        {movies.length && (
          movies.map((movie) => (
            <MovieCard 
              key={movie.id || movie._id} 
              movie={movie}
              removeMovie={removeMovie}
              findMode={true}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Find
