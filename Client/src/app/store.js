import { configureStore } from '@reduxjs/toolkit'
import AppSliceReducer from './../slices/AppSlice'
import JobSliceReducer from '../slices/JobSlice'

export const store = configureStore({
  reducer: {
    app: AppSliceReducer,
    jobs: JobSliceReducer,
  },
})