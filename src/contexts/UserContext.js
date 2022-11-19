import { createContext, useState, useEffect } from 'react'
import useToggle from '../hooks/useToggle'
import { CheckSession } from '../services/auth'

export const UserContext = createContext()

export const UserProvider = (props) => {
  const [authenticated, toggleAuthenticated] = useToggle(false)
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
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
        authenticated,
        toggleAuthenticated
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
