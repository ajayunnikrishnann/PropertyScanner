import { configureStore } from "@reduxjs/toolkit";
import authReducer  from '../slices/authSlice';
import {userApiSlice} from '../slices/apiSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
       
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApiSlice.middleware),
    devTools: true,
})

export default store;   