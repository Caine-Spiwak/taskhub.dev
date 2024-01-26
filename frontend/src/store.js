import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import activeProjectReducer from './slices/activeProjectSlice'
import { apiSlice } from './slices/apiSlice'

const store = configureStore({
  reducer: {
      auth: authReducer,
      activeProject: activeProjectReducer,
			[apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

export default store