import '../styles/MovieCard.css'
import { TMDB_IMG_BASE } from '../global'

const MovieCard = (props) => {
  const viewMoreClickHandler = (evt) => {
    const parent = evt.target.parentNode
    parent.classList.toggle('expand')
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
          <button>No</button>
          <button>Yes</button>
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
