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

// const store = configureStore({
//     reducer: {
//         auth,
//     },
//     // @ts-ignore
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(checkTokenExpiryMiddleware),
// });

export default store;
