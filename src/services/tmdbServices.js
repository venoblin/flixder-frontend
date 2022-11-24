import axios from 'axios'
import { TMBD_BASE_URL, TMDB_KEY } from '../global'
import { stringifyTmdbId, pickRandomItems } from '../utils'

export const GetTmdbMovies = async (profile) => {
  const region = profile.region.tmdb_iso
  const providers = stringifyTmdbId(profile.providers, '|')
  const randGenres = pickRandomItems(profile.fav_genres)
  const genres = stringifyTmdbId(randGenres, ',')

  const url = `${TMBD_BASE_URL}/discover/movie?watch_region=${region}&with_watch_providers=${providers}&with_genres=${genres}&api_key=${TMDB_KEY}`
  console.log(url)
  const res = await axios.get(url)
  return res.data.results
}
