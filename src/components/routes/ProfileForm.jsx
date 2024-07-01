import '../../styles/ProfileNew.css'
import { useContext } from 'react'
import { OptionsContext } from '../../contexts/OptionsContext'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { PostProfile } from '../../services'
import useForm from '../../hooks/useForm'
import {
  inputChangeHandler,
  checkboxChangeHandler,
  checkboxCheck
} from '../../utils'
import { UtilitiesContext } from '../../contexts/UtilitiesContext'

const ProfileNew = () => {
  const utilitiesContext = useContext(UtilitiesContext)
  const { regions, providers, images, genres } = useContext(OptionsContext)
  const { user, updateCurrentProfile } = useContext(UserContext)
  const [formState, setFormState, resetFormState] = useForm({
    name: '',
    profile_pic: '635484ed14c0720b4276ffd5',
    region: '6352c64f9879eee933e71121',
    providers: [],
    fav_genres: []
  })
  const navigate = useNavigate()

  const submitHandler = async (evt) => {
    evt.preventDefault()
    if (formState.providers.length <= 0 && formState.fav_genres.length <= 0) {
      return utilitiesContext.showPopUp('Need at least one provider and one favorite genre!')
    }

    try {
      const profile = await utilitiesContext.load(PostProfile(formState, user))
      updateCurrentProfile(profile)
      resetFormState()
      navigate('/')
    } catch {
      utilitiesContext.showPopUp('Error in posting profile!')
    }
  }

  return (
    <div className="ProfileNew">
      <h2>Create a profile!</h2>

      <form onSubmit={(evt) => submitHandler(evt)}>
        <div className="pics-container">
          {images.map((img) => (
            <div className="pic" key={img._id}>
                <input
                  type="radio"
                  name="profile_pic"
                  id={img._id}
                  value={img._id}
                  checked={formState.profile_pic === img._id ? true : false}
                  onChange={(evt) =>
                    inputChangeHandler(evt, formState, setFormState)
                  }
                />

              <label htmlFor={img._id}>
                <img src={img.url} alt={img.title} />
              </label>
            </div>
          ))}
        </div>

        <div className="main">
          <label htmlFor="name">Name</label>
          <input
            onChange={(evt) => inputChangeHandler(evt, formState, setFormState)}
            type="text"
            id="name"
            name="name"
            placeholder="Profile Name"
            value={formState.name}
            required
          />

          <h3>Region</h3>
          <label htmlFor="region">Choose a region:</label>
          <select
            onChange={(evt) => inputChangeHandler(evt, formState, setFormState)}
            name="region"
            id="region"
            value={formState.region}
            required
          >
            {regions.map((region) => (
              <option key={region._id} value={region._id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        <h3>Watch Providers</h3>
        <div className="providers-container">
          {providers.map((provider) => (
            <div key={provider._id}>
                <input
                  type="checkbox"
                  id={provider._id}
                  name={provider._id}
                  checked={checkboxCheck(formState.providers, provider._id) ? true : false}
                  onChange={(evt) =>
                    checkboxChangeHandler(
                      evt,
                      formState,
                      setFormState,
                      'providers'
                    )
                  }
                />

              <label htmlFor={provider._id}>{provider.provider_name}</label>
            </div>
          ))}
        </div>

        <h3>Favorite Genres</h3>
        <div className="genres-container">
          {genres.map((genre) => (
            <div key={genre._id}>
                <input
                  type="checkbox"
                  id={genre._id}
                  name={genre._id}
                  checked={checkboxCheck(formState.fav_genres, genre._id) ? true : false}
                  onChange={(evt) =>
                    checkboxChangeHandler(
                      evt,
                      formState,
                      setFormState,
                      'fav_genres'
                    )
                  }
                />

              <label htmlFor={genre._id}>{genre.name}</label>
            </div>
          ))}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default ProfileNew
