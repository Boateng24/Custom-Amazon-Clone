import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { productType } from '../@types';
import {toast} from 'react-toastify'

interface CartState {
    products: productType[]
}


// Selector or cart total function
export const getCartTotal = (products:productType[]) => {
    return products?.reduce((total, item) => total + item.price, 0)
}


const storedCartItems = localStorage.getItem('cartItems');

const initialState:CartState = {
  products:storedCartItems ? JSON.parse(storedCartItems) : []
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<productType>) => {
      const pushItem = action.payload;
      state.products = [...state.products, pushItem]
      localStorage.setItem('cartItems', JSON.stringify(state.products))
      toast.success("Product added successfully", {position: toast.POSITION.TOP_RIGHT})
    },

    removeItem: (state, action:PayloadAction<number>) => {
        const productId = action.payload
        const productIndex = state.products.findIndex((product) => product.id === productId);
        if(productIndex !== -1) {
            state.products.splice(productIndex, 1);
            localStorage.setItem("cartItems", JSON.stringify(state.products));
            toast.success("Product successfully removed", {position: toast.POSITION.TOP_RIGHT})
        }
        else{
            toast.error("Cannot remove product since it is not in the basket", {position: toast.POSITION.TOP_RIGHT})
            console.warn("Cannot remove product since it is not in the basket")
        }
    },
    
   
  },
});

export const {addItem, removeItem} = cartSlice.actions
export default cartSlice.reducer
