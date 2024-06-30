import '../../styles/Register.css'
import { useNavigate, Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import { RegisterUser } from '../../services/auth'
import { SignInUser } from '../../services/auth'
import { inputChangeHandler } from '../../utils'
import { useContext } from 'react'
import { UtilitiesContext } from '../../contexts/UtilitiesContext'
import { UserContext } from '../../contexts/UserContext'

const Register = () => {
  const utilitiesContext = useContext(UtilitiesContext)
  const { setUser, toggleAuthenticated, updateProfiles } = useContext(UserContext)
  const [formState, setFormState, resetFormState] = useForm({
    email: '',
    password: '',
    confirmPassword: ''
  })
  let navigate = useNavigate()

  const submitHandler = async (evt) => {
    evt.preventDefault()

    if (formState.password !== formState.confirmPassword) {
      return utilitiesContext.showPopUp('Passwords don\'t match!')
    }
    
    try {
        await utilitiesContext.load(RegisterUser(formState))

        const payload = await utilitiesContext.load(SignInUser(formState))
        setUser(payload)
        toggleAuthenticated(true)
        updateProfiles(payload)
        navigate('/')
    } catch {
      utilitiesContext.showPopUp('Email already in use!')
    }

    resetFormState()
  }

  return (
    <div className="Register">
      <form className="auth-form" onSubmit={(evt) => submitHandler(evt)}>
        <h2>Register</h2>
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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={formState.confirmPassword}
          onChange={(evt) => inputChangeHandler(evt, formState, setFormState)}
        />

        <button type="submit">Register</button>
        <div className="auth-prompt">
          <p>
            Already have an account?{' '}
            <Link className="link" to="/">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register
