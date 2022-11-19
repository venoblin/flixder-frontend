import Client from './api'

export const GetUser = async (userId) => {
  try {
    const res = await Client.get(`/api/users/${userId}`)
    return res.data.user
  } catch (error) {
    throw error
  }
}
