import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products",async()=>{
    const response = await fetch('https://dummyjson.com/products');
    const jsonResponse = await response.json();

    return jsonResponse.products

});

const initialState = {
    items:[],
    status:undefined,
    error:null
}

const productsSlice = createSlice({
    name:'productsSlice',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.items = action.payload
        })
    }
})

export default productsSlice.reducer