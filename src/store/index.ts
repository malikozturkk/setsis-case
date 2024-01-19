import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import { authApi } from '@/services';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(authApi.middleware),
});

export default store;