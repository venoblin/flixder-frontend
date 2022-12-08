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

  const submitHandler = async (evt) => {
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
      <form className="auth-form" onSubmit={(evt) => submitHandler(evt)}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          value={formState.email}
          onChange={(evt) => inputChangeHandler(evt, formState, setFormState)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          value={formState.password}
          onChange={(evt) => inputChangeHandler(evt, formState, setFormState)}
        />

        <button type="submit">Log In</button>
        <div className="auth-prompt">
          <p>
            Don't have an account?{' '}
            <Link className="link" to="/register">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
