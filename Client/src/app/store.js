import { configureStore } from '@reduxjs/toolkit'
import AppSliceReducer from './../slices/AppSlice'
import JobSliceReducer from '../slices/JobSlice'
import RecruiterSliceReducer from '../slices/RecruiterSlice'

export const store = configureStore({
  reducer: {
    app: AppSliceReducer,
    jobs: JobSliceReducer,
    recuiter: RecruiterSliceReducer,
  },
})