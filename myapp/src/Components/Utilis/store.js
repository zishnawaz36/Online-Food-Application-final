import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import AuthSlice  from "./AuthSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';


const persitConfig={
    key:"root",
    storage
}
const persistedAuthReducer =persistReducer(persitConfig,AuthSlice)
const store=configureStore({
    reducer:{
        cart: cartReducer,
        auth:  persistedAuthReducer
    }
})
export default store;
export const persistor = persistStore(store)