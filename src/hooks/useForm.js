import { useState } from 'react'

const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState)

  const resetFormState = () => {
    setFormState(initialState)
  }

  return [formState, setFormState, resetFormState]
}

export default useForm
