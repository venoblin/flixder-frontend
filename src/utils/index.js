export const inputChangeHandler = (evt, state, setState) => {
  const target = evt.target
  setState({ ...state, [target.name]: target.value })
}

// adds and removes checkbox to state array
export const checkboxChangeHandler = (evt, state, setState, key) => {
  const target = evt.target
  const arr = [...state[key]]

  if (target.checked) {
    arr.push(target.id)
    setState({ ...state, [key]: [...arr] })
  } else {
    const filtered = arr.filter((provider) => provider !== target.id)
    setState({ ...state, [key]: [...filtered] })
  }
}

// checks if checkbox is in state array
export const checkboxCheck = (stateArr, check) => {
  for (let state of stateArr) {
    if (state === check) return true
  }
  return false
}

// returns tmdb ids in an array in a string divided by a character
export const stringifyTmdbId = (arrToFormat, divider) => {
  let str = ''

  arrToFormat.forEach((item, idx) => {
    idx < arrToFormat.length - 1
      ? (str += `${item.tmdb_id}${divider}`)
      : (str += item.tmdb_id)
  })

  return str
}

// picks random item from an array and returns it
export const pickRandomItems = (arr) => {
  let randItems = []
  if (arr.length > 2) {
    for (let i = 0; i < 2; i++) {
      const randNum = Math.floor(Math.random() * arr.length)
      randItems.push(arr[randNum])
    }
  } else {
    randItems = [...arr]
  }

  return randItems
}

// populates genres from tmdb to their corresponding genre in out db
export const populateGenres = (movie, genres) => {
  const arr = []
  movie.genre_ids.forEach((genreId) => {
    for (let genre of genres) {
      if (genreId === genre.tmdb_id) {
        arr.push(genre._id)
      }
    }
  })

  return arr
}

// gets the movies id array of profile and returns a new one with added items
export const addFavMovie = (profile, movie) => {
  const movies = profile.fav_movies
  movies.push(movie)

  return movies
}

// checks if a parent element contains a certain element
export const containsElem = (parentElem, elem) => {
  const children = parentElem.querySelectorAll('*')

  for (let child of children) {
    if (child === elem) return true
  }

  return false
}
