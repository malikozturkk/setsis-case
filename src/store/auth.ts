// import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
// import Cookie from 'js-cookie';

// interface AuthState {
//     user: boolean;
//     userName?: string | boolean
// }

// const initialState: AuthState = {
//     user: !!Cookie.get('accessToken'),
//     userName: Cookie.get('userName')?.toUpperCase() || ''
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setAccessToken: (state, action: PayloadAction<string>) => {
//             Cookie.set('accessToken', action.payload);
//             state.user = true;
//         },
//         setRefreshToken: (state, action: PayloadAction<string>) => {
//             Cookie.set('refreshToken', action.payload);
//         },
//         logout: (state) => {
//             state.user = false;
//             state.userName = false;
//             Cookie.remove('accessToken');
//             Cookie.remove('refreshToken');
//             Cookie.remove('userName');
//         },
//         refreshToken: (state) => {
//             // Bu reducer'ın işlevselliği aşağıda tanımlanacak thunk ile gerçekleştirilecek
//         },
//     },
// });

// export const { setAccessToken, setRefreshToken, logout, refreshToken } = authSlice.actions;
// export default authSlice.reducer;

// export const refreshTokenRequest = () => async (dispatch: Dispatch) => {
//     const refreshToken = Cookie.get('refreshToken');
//     const response = await fetch('​/api​/Auth​/RefreshTokenLogin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ refreshToken })
//     });
//     const data = await response.json();
//     dispatch(setAccessToken(data.accessToken));
// };


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '@/services';
import Cookie from 'js-cookie';
import { SliceTypes } from '@/types/auth';

interface LogInParams {
    usernameOrEmail: string;
    password: string;
}

// Async thunks
export const logIn = async ({ usernameOrEmail, password}: LogInParams) => {
  try {
        const response = await API.post("/api/v1/auth-login", {
          usernameOrEmail,
          password,
        }); 
        
       const res = await response.json()
       return res.data
  } catch (error) {
    return error;
  }
};

export const refreshSession = createAsyncThunk('auth/refreshSession', async (refreshToken, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    const res = await response.json();
    if (!res.success) throw new Error(res.message);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

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

export const { logOut } = authSlice.actions;

export default authSlice.reducer;