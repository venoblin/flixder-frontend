import { createContext, useState, useEffect } from 'react'
import useToggle from '../hooks/useToggle'
import { CheckSession } from '../services/auth'
import { GetUserProfiles } from '../services'

export const UserContext = createContext()

export const UserProvider = (props) => {
  const [authenticated, toggleAuthenticated] = useToggle(false)
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState(null)
  const [currentProfile, setCurrentProfile] = useState(null)

  const handleLogout = () => {
    setUser(null)
    setProfiles(null)
    setCurrentProfile(null)
    toggleAuthenticated()
    localStorage.clear()
  }

  const updateCurrentProfile = (profile) => {
    setCurrentProfile(profile)
    localStorage.setItem('profile_id', profile._id)
  }

  const resetCurrentProfile = () => {
    setCurrentProfile(null)
    localStorage.removeItem('profile_id')
  }

  const updateProfiles = async (user) => {
    const userProfiles = await GetUserProfiles(user)
    setProfiles(userProfiles)

    const storedProfileId = localStorage.getItem('profile_id')

    if (storedProfileId) {
      const currentProfile = userProfiles.filter(
        (profile) => profile._id === storedProfileId
      )
      setCurrentProfile(currentProfile[0])
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
        currentProfile,
        updateCurrentProfile,
        resetCurrentProfile,
        authenticated,
        toggleAuthenticated,
        handleLogout
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
