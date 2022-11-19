import '../../styles/Register.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import useForm from '../../hooks/useForm'
import { RegisterUser } from '../../services/auth'
import { inputChangeHandler } from '../../utils'

const Register = () => {
  const { setUser, toggleAuthenticated } = useContext(AuthContext)
  const [formState, setFormState, resetFormState] = useForm({
    email: '',
    password: '',
    confirmPassword: ''
  })
  let navigate = useNavigate()

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    if (
      formState.password &&
      formState.confirmPassword &&
      formState.password === formState.confirmPassword
    ) {
      const payload = await RegisterUser({
        email: formState.email,
        password: formState.password
      })
      setUser(payload)
      toggleAuthenticated(true)

      navigate('/login')
    }

    resetFormState()
  }

  return (
    <div className="Register">
      <h2>Register</h2>

      <form onSubmit={(evt) => handleSubmit(evt)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formState.email}
          onChange={(evt) => inputChangeHandler(evt, formState, setFormState)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={formState.password}
          onChange={(evt) => inputChangeHandler(evt, formState, setFormState)}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          required
          value={formState.confirmPassword}
          onChange={(evt) => inputChangeHandler(evt, formState, setFormState)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
