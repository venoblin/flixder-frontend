export const inputChangeHandler = (evt, state, setState) => {
  const target = evt.target
  setState({ ...state, [target.name]: target.value })
}

export const checkboxChangeHandler = (evt, state, setState, key) => {
  const target = evt.target

  const arr = [...state[key]].push(target.id)
  setState({ ...state, [state[key]]: arr })
}
