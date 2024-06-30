import { useState } from 'react'

const useToggle = (initialState = false) => {
  const [toggleState, setToggleState] = useState(initialState)

  const toggle = (bool) => {
    if (bool && bool !== toggleState) {
      setToggleState(bool)
    } else { 
      setToggleState(currState => !currState)
    }
  }

  return [toggleState, toggle]
}

export default useToggle
