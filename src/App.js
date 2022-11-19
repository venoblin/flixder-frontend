import './styles/App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/routes/Home'
import Login from './components/routes/Login'
import Register from './components/routes/Register'
import ProfileNew from './components/routes/ProfileNew'

const App = () => {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>

      <h1>Flixder</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles/new" element={<ProfileNew />} />
      </Routes>
    </div>
  )
}

export default App
