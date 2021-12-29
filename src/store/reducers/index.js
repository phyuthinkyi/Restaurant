import Data from './data'
import Cart from './cart'
import Qty from './qty'
import WishList from './wishlist'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
   Data,
   Cart,
   Qty,
   WishList
})

export default rootReducer