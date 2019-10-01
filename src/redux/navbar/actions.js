import {
  LOGIN_USER,
  LOGIN_ERROR,
  ISLOGGED,
} from './const'

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user
})

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error
})

export const  isLogged = (log) => ({
  type: ISLOGGED,
  payload: log
})

