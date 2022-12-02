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

const ProfileNew = () => {
  const { regions, providers, images, genres } = useContext(OptionsContext)
  const { user, updateProfiles, updateCurrentProfile } = useContext(UserContext)
  const [formState, setFormState, resetFormState] = useForm({
    name: '',
    profile_pic: '635484ed14c0720b4276ffd5',
    region: '6352c64f9879eee933e71121',
    providers: [],
    fav_genres: []
  })
  let navigate = useNavigate()

  const submitHandler = async (evt) => {
    evt.preventDefault()

    const profile = await PostProfile(formState, user)
    updateCurrentProfile(profile)
    updateProfiles()
    resetFormState()
    navigate('/')
  }

  return (
    <div className="ProfileNew">
      <h2>Create a profile!</h2>

      <form onSubmit={(evt) => submitHandler(evt)}>
        <div className="pics-container">
          {images.map((img) => (
            <div className="pic" key={img._id}>
              {formState.profile_pic === img._id ? (
                <input
                  type="radio"
                  name="profile_pic"
                  id={img._id}
                  value={img._id}
                  checked
                  onChange={(evt) =>
                    inputChangeHandler(evt, formState, setFormState)
                  }
                />
              ) : (
                <input
                  type="radio"
                  name="profile_pic"
                  id={img._id}
                  value={img._id}
                  onChange={(evt) =>
                    inputChangeHandler(evt, formState, setFormState)
                  }
                />
              )}

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
            placeholder="Profile name"
            value={formState.name}
            required
          />

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

        <div className="providers-container">
          <h2>Watch Providers</h2>

          {providers.map((provider) => (
            <div key={provider._id}>
              {checkboxCheck(formState.providers, provider._id) ? (
                <input
                  type="checkbox"
                  id={provider._id}
                  name={provider._id}
                  checked
                  onChange={(evt) =>
                    checkboxChangeHandler(
                      evt,
                      formState,
                      setFormState,
                      'providers'
                    )
                  }
                />
              ) : (
                <input
                  type="checkbox"
                  id={provider._id}
                  name={provider._id}
                  onChange={(evt) =>
                    checkboxChangeHandler(
                      evt,
                      formState,
                      setFormState,
                      'providers'
                    )
                  }
                />
              )}

              <label htmlFor={provider._id}>{provider.provider_name}</label>
            </div>
          ))}
        </div>

        <div className="genres-container">
          <h2>Favorite Genres</h2>

          {genres.map((genre) => (
            <div key={genre._id}>
              {checkboxCheck(formState.fav_genres, genre._id) ? (
                <input
                  type="checkbox"
                  id={genre._id}
                  name={genre._id}
                  checked
                  onChange={(evt) =>
                    checkboxChangeHandler(
                      evt,
                      formState,
                      setFormState,
                      'fav_genres'
                    )
                  }
                />
              ) : (
                <input
                  type="checkbox"
                  id={genre._id}
                  name={genre._id}
                  onChange={(evt) =>
                    checkboxChangeHandler(
                      evt,
                      formState,
                      setFormState,
                      'fav_genres'
                    )
                  }
                />
              )}

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
