import { configureStore } from "@reduxjs/toolkit";
import authReducer  from '../slices/authSlice';
import {userApiSlice} from '../slices/apiSlice'
import adminReducer from '../slices/adminAuthSlice'
import bannerReducer from '../slices/bannerSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminAuth: adminReducer,
        banner: bannerReducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        userApiSlice.middleware,
     
        ),
    devTools: true,
})

export default store;   