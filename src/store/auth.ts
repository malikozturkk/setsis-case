import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '@/services';
import Cookie from 'js-cookie';
import { SliceTypes } from '@/types/auth';



const authSlice = createSlice({
  name: 'auth',
  initialState:<SliceTypes> {
    user: !!Cookie.get('accessToken'),
    userName: Cookie.get('userName')?.toUpperCase() || '',
    refreshToken: null,
  },
  reducers: {
    logOut: (state) => {
      state.user = false;
      state.userName = '';
      state.refreshToken = null;
      Cookie.remove('accessToken');
      Cookie.remove('refreshToken');
      Cookie.remove('userName');
    },
    refreshSession: (state, action) => {
      state.user = true;
      state.refreshToken = action.payload.refreshToken;
      Cookie.set('accessToken', action.payload.accessToken);
      Cookie.set('refreshToken', action.payload.refreshToken);
      Cookie.set('expiration', action.payload.expiration);
    }
  },
  // extraReducers: {
  //   [logIn.fulfilled]: (state, action) => {
  //     state.currentUser = action.payload.session;
  //     state.accessToken = action.payload.token;
  //     state.refreshToken = action.payload.refreshToken;
  //     state.isAuthenticated = true;
  //   },
  //   [refreshSession.fulfilled]: (state, action) => {
  //     state.accessToken = action.payload.token;
  //   },
  // },
});

export const { logOut, refreshSession } = authSlice.actions;

export default authSlice.reducer;