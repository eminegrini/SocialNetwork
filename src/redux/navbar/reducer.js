import initialState from './initialState'
import {
  LOGIN_USER,
  LOGIN_ERROR,
  ISLOGGED,
} from './const';

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        user: {
          email: action.payload.email,
          name: action.payload.displayName,
          photo: action.payload.photoURL
        }
      }
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case ISLOGGED: {
      return {
        ...state,
        isLog: action.payload
      }
    }
   
    default:
      return state
  }
}