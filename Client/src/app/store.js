import { configureStore } from '@reduxjs/toolkit'
import AppSliceReducer from './../slices/AppSlice'
import JobSliceReducer from '../slices/JobSlice'
import RecruiterSliceReducer from '../slices/RecruiterSlice'
import CompanySliceReducer from '../slices/CompanySlice'
import BackendAPISliceReducer  from '../slices/BackendAPI'

export const store = configureStore({
  reducer: {
    app: AppSliceReducer,
    jobs: JobSliceReducer,
    recuiter: RecruiterSliceReducer,
    company: CompanySliceReducer,
    backendAPI: BackendAPISliceReducer,
  },
})