import Data from './data'
import Cart from './cart'
import Qty from './qty'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
   Data,
   Cart,
   Qty
})

export default rootReducer