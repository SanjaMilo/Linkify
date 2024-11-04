import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    urls: []
}

export const urlsSlice = createSlice({
    name: 'urls',
    initialState,
    reducers: {
        setAllUrls: (state, action) => {
            state.urls = action.payload;
        },
        createShortUrl: (state, action) => {
            // add new urls at the top and spread all other recipes
            state.urls = [action.payload, ...state.urls];
        }
    }
});


export const { setAllUrls, createShortUrl } = urlsSlice.actions;

export default urlsSlice.reducer; // default export. When we import it in store.js  the name is "urlsReducer"

