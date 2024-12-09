import { createSlice } from "@reduxjs/toolkit";

const wishlstSlice = createSlice({
    name: "wishlists",
    initialState: [],
    reducers: {
        addToWislist:(state,actonFromView)=>{
            state.push(actonFromView.payload)
        },
        removeItem:(state,actionFromWishlist)=>{
            return state.filter((item)=>item.id != actionFromWishlist.payload)
        }
    }
})

export const {addToWislist, removeItem} = wishlstSlice.actions
export default wishlstSlice.reducer