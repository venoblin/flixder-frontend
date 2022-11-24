import '../styles/MovieCard.css'
import { TMDB_IMG_BASE } from '../global'

const MovieCard = (props) => {
  return (
    <div className="MovieCard">
      <img
        src={`${TMDB_IMG_BASE}${props.movie.poster_path}`}
        alt={`${props.movie.title} poster`}
      />

      <div className="movie-intro">
        <h2>{props.movie.title}</h2>

        <div className="votes-container">
          <p className="vote">{props.movie.vote_average}</p>

          <p className="count">{`${props.movie.vote_count} votes`}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
