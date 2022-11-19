import '../../styles/Login.css'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { SignInUser } from '../../services/auth'
import useForm from '../../hooks/useForm'
import { inputChangeHandler } from '../../utils'

const Login = () => {
  const { setUser, toggleAuthenticated } = useContext(UserContext)
  const [formState, setFormState, resetFormState] = useForm({
    email: '',
    password: ''
  })
  let navigate = useNavigate()

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    try {
      const payload = await SignInUser(formState)
      setUser(payload)
      toggleAuthenticated(true)
      navigate('/')
    } catch (err) {
      console.log('There was an error!')
    }

    resetFormState()
  }

  return (
    <div className="Login">
      <h2>Login</h2>

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

        <button type="submit">Log In</button>
      </form>

      <div className="register-prompt">
        <h3>Don't have an account?</h3>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default Login
