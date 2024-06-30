import '../styles/UtilitiesContext.css'
import { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useToggle from '../hooks/useToggle'

export const UtilitiesContext = createContext()

export const UtilitiesProvider = (props) => {
  const [isLoading, toggleIsLoading] = useToggle()
  const [isShowing, toggleIsShowing] = useToggle()
  const [popUpMsg, setPopUpMsg] = useState('')
  const { pathname } = useLocation()

  const load = (promise) => {
    toggleIsLoading()
    return promise?.then((res) => {
      toggleIsLoading()
      return res
    }).catch(() => {
      toggleIsLoading()
      throw new Error()
    })
  }

  const showPopUp = (msg) => {
    setPopUpMsg(msg)
    toggleIsShowing()
  }

  const dismissPopUp = () => {
    setPopUpMsg('')
    toggleIsShowing()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return (
    <UtilitiesContext.Provider value={{load, showPopUp}}>
      {props.children}

      {isLoading && 
        <div className='pop-up'>
          <span className='loader'></span>
        </div>
      }

      {isShowing && 
        <div className='pop-up'>
          <p>{popUpMsg}</p>
          <button onClick={dismissPopUp}>Ok</button>
        </div>
      }
    </UtilitiesContext.Provider>
  )
}