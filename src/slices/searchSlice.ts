import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface SearchState {
    searchItem:string
}

const initialState:SearchState = {
    searchItem: ''
}



export const searchSlice = createSlice({
    name:'searchItem',
    initialState,
    reducers:{
        setSearch: (state, action:PayloadAction<string>) => {
            state.searchItem = action.payload
        }
    }
})

export const {setSearch} = searchSlice.actions;

export default searchSlice.reducer;