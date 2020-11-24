import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { jwtReducer } from './jwtReducer'

export const rootReducer = combineReducers({
    jwtReducer,
})

let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export { store }
