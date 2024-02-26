// redux-persist-config.js

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "redux";
import userReducer  from "../reducers/userReducer";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";

const persistConfig = {
    key: "ea-trading",
    storage,
    whitelist: ["user"],
};

// const customizedMiddleware = getDefaultMiddleware({
//     serializableCheck: false,
// });
const rootReducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
