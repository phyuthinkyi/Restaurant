import Data from './data'
import Cart from './cart'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
   Data,
   Cart
})

export default rootReducer