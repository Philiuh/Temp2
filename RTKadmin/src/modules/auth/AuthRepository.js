import { STORAGE } from '../../constants'

export const getToken = () => localStorage.getItem(STORAGE.TOKEN)

export const setToken = token => localStorage.setItem(STORAGE.TOKEN, token)

export const removeToken = () => localStorage.removeItem(STORAGE.TOKEN)
