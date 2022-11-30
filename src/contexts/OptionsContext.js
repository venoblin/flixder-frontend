import { useState, useEffect, createContext } from 'react'
import { GetRegions, GetProviders, GetImages, GetGenres } from '../services'

export const OptionsContext = createContext()

export const OptionsProvider = (props) => {
  const [regions, setRegions] = useState([])
  const [providers, setProviders] = useState([])
  const [images, setImages] = useState([])
  const [genres, setGenres] = useState([])

  const getOptions = () => {
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
    getOptions()
  }, [])

  return (
    <OptionsContext.Provider
      value={{
        regions,
        providers,
        images,
        genres
      }}
    >
      {props.children}
    </OptionsContext.Provider>
  )
}
