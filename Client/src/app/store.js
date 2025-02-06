import { configureStore } from '@reduxjs/toolkit'
import AppSliceReducer from './../slices/AppSlice'

export const store = configureStore({
  reducer: {
    app: AppSliceReducer,
  },
})