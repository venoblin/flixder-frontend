import './styles/App.css'
import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'
import ScrollToTopHandler from './ScrollToTopHandler'
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
      <ScrollToTopHandler />

      {authenticated && (
        <header>
          <NavBar />
        </header>
      )}

      <main>
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
      </main>
    </div>
  )
}

export default App
