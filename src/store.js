  
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from './redux'

export default function configureStore() {
  const enhancer = composeWithDevTools()

  const store = createStore(rootReducer, enhancer)

  return store
}