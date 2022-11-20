export const inputChangeHandler = (evt, state, setState) => {
  const target = evt.target
  setState({ ...state, [target.name]: target.value })
}

// adds and removes checkbox to state array
export const checkboxChangeHandler = (evt, state, setState, key) => {
  const target = evt.target
  const arr = [...state[key]]

  if (target.checked) {
    arr.push(target.id)
    setState({ ...state, [key]: [...arr] })
  } else {
    const filtered = arr.filter((provider) => provider !== target.id)
    setState({ ...state, [key]: [...filtered] })
  }
}

// checks if checkbox is in state array
export const checkboxCheck = (stateArr, check) => {
  for (let state of stateArr) {
    if (state === check) return true
  }
  return false
}
