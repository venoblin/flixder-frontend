import Client from './api'

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
