import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import { checkTokenExpiryMiddleware } from './middleware';

const store = configureStore({
    reducer: {
        auth,
    },
    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(checkTokenExpiryMiddleware),
});

export default store;
