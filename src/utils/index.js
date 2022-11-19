export const inputChangeHandler = (evt, state, setState) => {
  const target = evt.target
  setState({ ...state, [target.id]: target.value })
}
