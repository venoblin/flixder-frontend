import '../styles/MovieStack.css'
import MovieCard from './MovieCard'

const MovieStack = (props) => {
  const classes = props.findMode ? 'MovieStack find-mode' : 'MovieStack'

  return (
    <div className={classes}>
      {props.movies.map((movie) => (
        <MovieCard
          key={movie.id || movie._id}
          movie={movie}
          findMode={props.findMode}
        />
      ))}
    </div>
  )
}

export default MovieStack
