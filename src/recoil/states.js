import {
  atom
} from 'recoil'

export const searchQuery = atom({
  key: 'searchQuery', // unique ID (with respect to other atoms/selectors)
  default: '' // default value (aka initial value)
})

export const searchedState = atom({
  key: 'searched',
  default: 'false'
})

export const mapLat = atom({
  key: 'mapLat',
  default: 51.757795855861815
})

export const mapLng = atom({
  key: 'mapLng',
  default: -1.2230595517611809
})
