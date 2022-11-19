import { useState } from 'react'

const useToggle = (initialState = false) => {
  const [toggleState, setToggleState] = useState(initialState)

  const toggle = () => {
    setToggleState(!toggleState)
  }

  return [toggleState, toggle]
}

export default useToggle
