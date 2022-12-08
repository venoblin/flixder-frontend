import '../styles/MovieCard.css'
import { useContext, useRef } from 'react'
import { OptionsContext } from '../contexts/OptionsContext'
import { UserContext } from '../contexts/UserContext'
import { PostMovie, UpdateProfile } from '../services'
import { TMDB_IMG_BASE } from '../global'

const MovieCard = (props) => {
  const { genres } = useContext(OptionsContext)
  const { currentProfile, updateCurrentProfile } = useContext(UserContext)
  const cardRef = useRef()
  const movieInfoRef = useRef()

  const viewMoreHandler = () => {
    movieInfoRef.current.classList.toggle('expand')
  }

  const deleteHandler = async () => {
    const newMovies = currentProfile.fav_movies.filter(
      (movie) => movie._id !== props.movie._id
    )
    updateCurrentProfile({ ...currentProfile, fav_movies: newMovies })
    await UpdateProfile({ fav_movies: newMovies }, currentProfile)
  }

  const noHandler = () => {
    cardRef.current.remove()
  }

  const yesHandler = async () => {
    await PostMovie(props.movie, currentProfile, genres)

    cardRef.current.remove()
  }

  const classes = props.findMode ? 'MovieCard find-mode' : 'MovieCard'

  return (
    <div className={classes} ref={cardRef}>
      <img
        src={`${TMDB_IMG_BASE}${props.movie.poster_path}`}
        alt={`${props.movie.title} poster`}
      />

      <div className="movie-details">
        <div className="movie-info" ref={movieInfoRef}>
          <h2>{props.movie.title}</h2>

          <div className="votes-container">
            <p className="vote">{props.movie.vote_average}</p>

            <p className="count">{`${props.movie.vote_count} votes`}</p>
          </div>

          <div className="desc">{props.movie.overview}</div>
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
