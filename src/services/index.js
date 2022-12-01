import Client from './api'
import { populateGenres, addFavMovie } from '../utils'

export const GetRegions = async () => {
  try {
    const res = await Client.get('/api/regions')
    return res.data.regions
  } catch (err) {
    throw err
  }
}

export const GetProviders = async () => {
  try {
    const res = await Client.get('/api/providers')
    return res.data.providers
  } catch (err) {
    throw err
  }
}

export const GetImages = async () => {
  try {
    const res = await Client.get('/api/images')
    return res.data.images
  } catch (err) {
    throw err
  }
}

export const GetGenres = async () => {
  try {
    const res = await Client.get('/api/genres')
    return res.data.genres
  } catch (err) {
    throw err
  }
}

export const PostProfile = async (data, user) => {
  try {
    const profileRes = await Client.post('/api/profiles', data)
    const userRes = await Client.get(`/api/users/${user.id}`)

    await Client.put(`/api/users/${user.id}`, {
      profiles: [...userRes.data.profiles, profileRes.data._id]
    })

    return userRes.data
  } catch (err) {
    throw err
  }
}

export const PostMovie = async (movie, profile, genres) => {
  try {
    const flixderMovie = await Client.get(`/api/movies/tmdb/${movie.id}`)

    if (flixderMovie.data.movie) {
      const newMovies = addFavMovie(profile, movie)
      await Client.put(`/api/profiles/${profile._id}`, {
        fav_movies: newMovies
      })

      return flixderMovie.data.movie
    } else {
      const genreIds = populateGenres(movie, genres)
      const newMovie = {
        tmdb_id: movie.id,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        title: movie.title,
        release_date: movie.release_date,
        overview: movie.overview,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        genre_ids: genreIds
      }
      const res = await Client.post('/api/movies', newMovie)

      const newMovies = addFavMovie(profile, res.data)
      await Client.put(`/api/profiles/${profile._id}`, {
        fav_movies: newMovies
      })

      return res.data
    }
  } catch (err) {
    throw err
  }
}

export const GetUserProfiles = async (user) => {
  try {
    const res = await Client.get(`/api/users/${user.id}`)

    return res.data.profiles
  } catch (err) {
    throw err
  }
}
