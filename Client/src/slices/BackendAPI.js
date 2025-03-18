import { createSlice } from "@reduxjs/toolkit";

const BackendAPISlice = createSlice({
  name: 'backendAPI',
  initialState : {
    API: import.meta.env.VITE_BACKEND_URL,
  },
  reducers:{},

})


export const selectBackendApi = (state) => state.backendAPI.API
export default BackendAPISlice.reducer