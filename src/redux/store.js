import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './slice'
import productsReducer from './productSlice'
import authReducer from './authSlice'

// creating store and reducer
const store = configureStore({
    reducer:{
        cart:cartReducer,
        products:productsReducer,
        auth:authReducer,
    }
})


// exporting store

export default store