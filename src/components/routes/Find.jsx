import '../../styles/Find.css'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { GetTmdbMovies } from '../../services/tmdbServices'
import MovieStack from '../MovieStack'
import { UtilitiesContext } from '../../contexts/UtilitiesContext'

const Find = () => {
  const utilitiesContext = useContext(UtilitiesContext)
  const { currentProfile } = useContext(UserContext)
  const [movies, setMovies] = useState([])

  const getMovies = async () => {
    try {
      const res = await utilitiesContext.load(GetTmdbMovies(currentProfile))
      setMovies(res)
    } catch {
      utilitiesContext.showPopUp('Error in getting movies!')
    }
  }

  useEffect(() => {
    getMovies()
  }, [currentProfile])

  return (
    <div className="Find">

      {movies.length && <MovieStack movies={movies} findMode={true} />}
    </div>
  )
}

export default Find
