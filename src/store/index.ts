import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import { authApi } from '@/services';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(authApi.middleware, apiSlice.middleware),
});

export default store;