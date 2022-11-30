import '../styles/MovieCard.css'
import { useContext } from 'react'
import { OptionsContext } from '../contexts/OptionsContext'
import { UserContext } from '../contexts/UserContext'
import { TMDB_IMG_BASE } from '../global'
import { PostMovie } from '../services'

const MovieCard = (props) => {
  const { genres } = useContext(OptionsContext)
  const { currentProfile, updateProfiles } = useContext(UserContext)

  const viewMoreClickHandler = (evt) => {
    const parent = evt.target.parentNode
    parent.classList.toggle('expand')
  }

  const noHandler = (evt) => {
    const card = evt.currentTarget.parentNode.parentNode.parentNode
    card.remove()
  }

  const yesHandler = async (evt) => {
    const card = evt.currentTarget.parentNode.parentNode.parentNode
    await PostMovie(props.movie, currentProfile, genres)
    updateProfiles()
    card.remove()
  }

  return props.findMode ? (
    <div className="MovieCard find-mode">
      <img
        src={`${TMDB_IMG_BASE}${props.movie.poster_path}`}
        alt={`${props.movie.title} poster`}
      />

      <div className="movie-details">
        <div className="movie-info">
          <h2>{props.movie.title}</h2>

          <div className="votes-container">
            <p className="vote">{props.movie.vote_average}</p>

            <p className="count">{`${props.movie.vote_count} votes`}</p>
          </div>

          <div className="desc">{props.movie.overview}</div>

          <button onClick={(evt) => viewMoreClickHandler(evt)}>
            View More
          </button>
        </div>

        <div className="inputs">
          <button onClick={(evt) => noHandler(evt)}>No</button>
          <button onClick={(evt) => yesHandler(evt)}>Yes</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="MovieCard">
      <img
        src={`${TMDB_IMG_BASE}${props.movie.poster_path}`}
        alt={`${props.movie.title} poster`}
      />

      <div className="movie-details">
        <div className="movie-info">
          <h2>{props.movie.title}</h2>

          <div className="votes-container">
            <p className="vote">{props.movie.vote_average}</p>

            <p className="count">{`${props.movie.vote_count} votes`}</p>
          </div>

          <div className="desc">{props.movie.overview}</div>

          <button onClick={(evt) => viewMoreClickHandler(evt)}>
            View More
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
