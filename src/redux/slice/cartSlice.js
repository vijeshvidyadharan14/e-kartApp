import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cartItems',
    initialState:[],
    reducers:{
        //action-name : reducer function
        addToCart:(state,actionByComponent)=>{
            const existingProduct = state.find((item)=>item.id == actionByComponent.payload.id);
            if(existingProduct){
                existingProduct.quantity++
                existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
                const remainingProducts = state.filter(item=>item.id!=existingProduct.id)
                state = [...remainingProducts,existingProduct]
            }else{
                state.push({...actionByComponent.payload,quantity:1,totalPrice:actionByComponent.payload.price})
            }
        },
        incrementQuantity : (state,actionByComponent) => {
            const existingProduct = state.find((item) => item.id == actionByComponent.payload)
            existingProduct.quantity++
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
            const remainingProducts = state.filter(item => item.id != existingProduct.id)
            state = [...remainingProducts, existingProduct]
        },
        decrementQuantity : (state,actionByComponent) => {
            const existingProduct = state.find((item) => item.id == actionByComponent.payload)
            existingProduct.quantity--
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
            const remainingProducts = state.filter(item => item.id != existingProduct.id)
            state = [...remainingProducts, existingProduct]
        },
        removeCartItem : (state,actionByCart) => {
            return state.filter(item => item.id != actionByCart.payload)
        },
        emptyCart : (state) => {
            return state = []
        }
    }
})

export const {addToCart, incrementQuantity, decrementQuantity, removeCartItem, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;