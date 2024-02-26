import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create a Redux store
const store = createStore(
  persistedReducer,
  
);

// Create a persisted version of the store
const persistor = persistStore(store);

// Export an object with store and persistor properties
export { store, persistor };
