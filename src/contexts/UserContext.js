import { createContext, useState, useEffect } from 'react'
import useToggle from '../hooks/useToggle'
import { CheckSession } from '../services/auth'
import { GetUserProfiles } from '../services/services'

export const UserContext = createContext()

export const UserProvider = (props) => {
  const [authenticated, toggleAuthenticated] = useToggle(false)
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState(null)

  const updateProfiles = async (thisUser = user) => {
    const userProfiles = await GetUserProfiles(thisUser)
    setProfiles(userProfiles)
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
        authenticated,
        toggleAuthenticated
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
