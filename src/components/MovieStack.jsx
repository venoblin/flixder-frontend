import '../styles/MovieStack.css'
import MovieCard from './MovieCard'

const MovieStack = (props) => {
  return (
    <div className="MovieStack">
      {props.movies &&
        props.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} findMode={props.findMode} />
        ))}
    </div>
  )
}

export default MovieStack
