import './styles/App.css'
import { useContext, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'
import { containsElem } from './utils'
import NavBar from './components/NavBar'
import Home from './components/routes/Home'
import Find from './components/routes/Find'
import Login from './components/routes/Login'
import Register from './components/routes/Register'
import ProfileForm from './components/routes/ProfileForm'

const App = () => {
  const { authenticated } = useContext(UserContext)
  const profileSwitcherRef = useRef()
  const dropDownRef = useRef()

  const clickHandler = (evt) => {
    const target = evt.target

    if (profileSwitcherRef.current) {
      const isInNav = containsElem(profileSwitcherRef.current, target)
      if (!isInNav) dropDownRef.current.classList.remove('show')
    }
  }

  return (
    <div className="App" onClick={(evt) => clickHandler(evt)}>
      {authenticated && (
        <header>
          <NavBar
            profileSwitcherRef={profileSwitcherRef}
            dropDownRef={dropDownRef}
          />
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
