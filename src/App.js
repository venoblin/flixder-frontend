import './styles/App.css'
import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'
import NavBar from './components/NavBar'
import Home from './components/routes/Home'
import Find from './components/routes/Find'
import Login from './components/routes/Login'
import Register from './components/routes/Register'
import ProfileForm from './components/routes/ProfileForm'

const App = () => {
  const { authenticated } = useContext(UserContext)

  return (
    <div className="App">
      {authenticated && (
        <header>
          <NavBar />
        </header>
      )}

      {authenticated ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<Find />} />
          <Route path="/profiles/new" element={<ProfileForm />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </div>
  )
}

export default App
