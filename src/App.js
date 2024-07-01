import './styles/App.css'
import { useContext, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'
import NavBar from './components/NavBar'
import Home from './components/routes/Home'
import Find from './components/routes/Find'
import Login from './components/routes/Login'
import Register from './components/routes/Register'
import ProfileForm from './components/routes/ProfileForm'
import useToggle from './hooks/useToggle'

const App = () => {
  const { authenticated } = useContext(UserContext)
  const [isShowing, toggleIsShowing] = useToggle()
  const profileImgRef = useRef()
  const dropDownRef = useRef()

  const toggleDropDown = (evt) => {
    if (
      isShowing &&
      profileImgRef.current !== evt.target &&
      dropDownRef.current !== evt.target
    ) {
      toggleIsShowing()
    }
  }

  return (
    <div className="App" onClick={(evt) => toggleDropDown(evt)}>
      {authenticated && (
        <header>
          <NavBar
            isShowing={isShowing}
            toggleIsShowing={toggleIsShowing}
            profileImgRef={profileImgRef}
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
          <div>
            <h1 className="logo">Flixder</h1>

            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
