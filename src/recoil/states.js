import {
  atom
} from 'recoil'

export const searchQuery = atom({
  key: 'searchQuery', // unique ID (with respect to other atoms/selectors)
  default: '' // default value (aka initial value)
})
