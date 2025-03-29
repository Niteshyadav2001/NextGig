import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import AppSliceReducer from './../slices/AppSlice'
import JobSliceReducer from '../slices/JobSlice'
import RecruiterSliceReducer from '../slices/RecruiterSlice'
import CompanySliceReducer from '../slices/CompanySlice'
import BackendAPISliceReducer  from '../slices/BackendAPI'


const persistConfig = {
  key: 'root',
  storage,
};


export const store = configureStore({
  reducer: {
    app: persistReducer(persistConfig, AppSliceReducer),
    jobs: persistReducer(persistConfig, JobSliceReducer),
    recuiter: persistReducer(persistConfig, RecruiterSliceReducer),
    company: persistReducer(persistConfig, CompanySliceReducer),
    backendAPI: persistReducer(persistConfig, BackendAPISliceReducer),
  },
})

export const persistor = persistStore(store);