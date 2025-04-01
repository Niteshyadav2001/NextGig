import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import AppSliceReducer from './../slices/AppSlice'
import JobSliceReducer from '../slices/JobSlice'
import LoginSliceReducer from '../slices/LoginSlice'
import CompanySliceReducer from '../slices/CompanySlice'
import BackendAPISliceReducer  from '../slices/BackendAPI'
import UserSliceReducer from '../slices/UserSlice'


const persistConfig = {
  key: 'root',
  storage,
};


export const store = configureStore({
  reducer: {
    app: persistReducer(persistConfig, AppSliceReducer),
    jobs: persistReducer(persistConfig, JobSliceReducer),
    login: persistReducer(persistConfig, LoginSliceReducer),
    company: persistReducer(persistConfig, CompanySliceReducer),
    backendAPI: persistReducer(persistConfig, BackendAPISliceReducer),
    user: persistReducer(persistConfig, UserSliceReducer)
  },
})

export const persistor = persistStore(store);