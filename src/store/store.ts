import {configureStore} from '@reduxjs/toolkit';
import cartSlice from '../slices/cartSlice';
import authSlice from '../slices/authSlice';
import searchSlice from '../slices/searchSlice';

const store = configureStore({
  reducer: {
    addItemToBasket: cartSlice,
    auth: authSlice,
    search: searchSlice
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;