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

export const PostProfile = async (data, user) => {
  try {
    const profileRes = await Client.post('/api/profiles', data)
    const userRes = await Client.get(`/api/users/${user.id}`)

    const res = await Client.put(`/api/users/${user.id}`, {
      profiles: [...userRes.data.profiles, profileRes.data._id]
    })

    return userRes.data
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
