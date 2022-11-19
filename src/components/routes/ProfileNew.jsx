import '../../styles/ProfileNew.css'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import {
  GetRegions,
  GetProviders,
  GetImages,
  GetGenres
} from '../../services/getServices'
import useForm from '../../hooks/useForm'
import { inputChangeHandler } from '../../utils'

const ProfileNew = () => {
  const { user } = useContext(UserContext)
  const [formState, setFormState, resetFormState] = useForm({
    profile_pic: '',
    region: '',
    providers: [],
    fav_genres: []
  })
  const [regions, setRegions] = useState([])
  const [providers, setProviders] = useState([])
  const [images, setImages] = useState([])
  const [genres, setGenres] = useState([])

  const getFormOptions = () => {
    GetRegions()
      .then((res) => setRegions(res))
      .catch((err) => console.log(err))

    GetProviders()
      .then((res) => setProviders(res))
      .catch((err) => console.log(err))

    GetImages()
      .then((res) => setImages(res))
      .catch((err) => console.log(err))

    GetGenres()
      .then((res) => setGenres(res))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getFormOptions()
  }, [])

  return (
    <div className="ProfileNew">
      <h2>Create a profile!</h2>

      <form></form>
    </div>
  )
}

export default ProfileNew
