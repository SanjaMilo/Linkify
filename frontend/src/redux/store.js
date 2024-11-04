import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slices/userSlice';
import urlsReducer from './slices/urlsSlice';


export const store = configureStore({
    reducer: {
        urls: urlsReducer,
        // user: userReducer,
    }
});