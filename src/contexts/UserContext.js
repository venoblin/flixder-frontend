import { createContext, useState, useEffect } from 'react'
import useToggle from '../hooks/useToggle'
import { CheckSession } from '../services/auth'
import { GetUserProfiles } from '../services/services'

export const UserContext = createContext()

export const UserProvider = (props) => {
  const [authenticated, toggleAuthenticated] = useToggle(false)
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)

  const updateSelectedProfile = (profile) => {
    setSelectedProfile(profile)
    localStorage.setItem('profile_id', profile._id)
  }

  const updateProfiles = async (thisUser = user) => {
    const userProfiles = await GetUserProfiles(thisUser)
    setProfiles(userProfiles)

    const storedProfileId = localStorage.getItem('profile_id')

    if (storedProfileId) {
      const currentProfile = userProfiles.filter(
        (profile) => profile._id === storedProfileId
      )
      setSelectedProfile({ ...currentProfile })
    }
  }

  const checkToken = async () => {
    const userRes = await CheckSession()
    setUser(userRes)
    toggleAuthenticated(true)

    updateProfiles(userRes)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        profiles,
        updateProfiles,
        selectedProfile,
        updateSelectedProfile,
        authenticated,
        toggleAuthenticated
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
