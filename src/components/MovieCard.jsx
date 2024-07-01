import '../styles/MovieCard.css'
import { useContext } from 'react'
import { OptionsContext } from '../contexts/OptionsContext'
import { UserContext } from '../contexts/UserContext'
import { PostMovie, UpdateProfile } from '../services'
import { TMDB_IMG_BASE } from '../global'
import { UtilitiesContext } from '../contexts/UtilitiesContext'
import useToggle from '../hooks/useToggle'

const MovieCard = (props) => {
  const utilitiesContext = useContext(UtilitiesContext)
  const { genres } = useContext(OptionsContext)
  const { currentProfile, updateCurrentProfile } = useContext(UserContext)
  const [isShowing, toggleIsShowing] = useToggle()

  const viewMoreHandler = () => {
    toggleIsShowing()
  }

  const deleteHandler = async () => {
    try {
      const newMovies = currentProfile.fav_movies.filter(
        (movie) => movie._id !== props.movie._id
      )
      await utilitiesContext.load(UpdateProfile({ fav_movies: newMovies }, currentProfile))
      updateCurrentProfile({ ...currentProfile, fav_movies: newMovies })
    } catch {
      utilitiesContext.showPopUp('Error in deleting movie')
    }
  }

  const noHandler = () => {
    props.removeMovie(props.movie)
  }

  const yesHandler = async () => {
    try {
      await utilitiesContext.load(PostMovie(props.movie, currentProfile, genres))

      props.removeMovie(props.movie)
    } catch {
      utilitiesContext.showPopUp('Error in posting movie')
    }
  }

  const classes = props.findMode ? 'MovieCard find-mode' : 'MovieCard'

  return (
    <div className={classes}>
      <img
        src={`${TMDB_IMG_BASE}${props.movie.poster_path}`}
        alt={`${props.movie.title} poster`}
      />
      
      <div className="movie-details">
        <div className="movie-info">
          <h3>{props.movie.title}</h3>

          <div className="votes-container">
            <p className="vote">{props.movie.vote_average}</p>

            <p className="count">{`${props.movie.vote_count} votes`}</p>
          </div>

          {isShowing && 
            <div className="desc">{props.movie.overview}</div>
          }
        </div>

        <div className="inputs">
          {props.findMode ? (
            <div>
              <button className="circular danger" onClick={noHandler}>
                No
              </button>
              <button onClick={viewMoreHandler}>View More</button>
              <button className="circular success" onClick={yesHandler}>
                Yes
              </button>
            </div>
          ) : (
            <div>
              <button className="danger" onClick={deleteHandler}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
