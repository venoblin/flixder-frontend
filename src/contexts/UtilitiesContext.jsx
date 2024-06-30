import { createContext, useState} from 'react'
import useToggle from '../hooks/useToggle'

export const UtilitiesContext = createContext()

export const UtilitiesProvider = (props) => {
  const [isLoading, toggleIsLoading] = useToggle()
  const [isShowing, toggleIsShowing] = useToggle()
  const [componentToShow, setComponentToShow] = useState>(<p></p>)

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

  const showPopUp = (component) => {
    setComponentToShow(component)
    toggleIsShowing()
  }

  const dismissPopUp = () => {
    toggleIsShowing()
  }
  
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
          {componentToShow != null && 
            componentToShow
          }
          <button onClick={dismissPopUp}>Ok</button>
        </div>
      }
    </UtilitiesContext.Provider>
  )
}