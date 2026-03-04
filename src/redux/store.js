import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './slice'
import productsReducer from './productSlice'

// creating store and reducer
const store = configureStore({
    reducer:{
        cart:cartReducer,
        products:productsReducer
    }
})


// exporting store

export default store