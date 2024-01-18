import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

interface AuthState {
    user: boolean;
    userName?: string | boolean
}

const initialState: AuthState = {
    user: !!Cookie.get('accessToken'),
    userName: Cookie.get('userName')?.toUpperCase() || ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            Cookie.set('accessToken', action.payload);
            state.user = true;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            Cookie.set('refreshToken', action.payload);
        },
        logout: (state) => {
            state.user = false;
            state.userName = false;
            Cookie.remove('accessToken');
            Cookie.remove('refreshToken');
            Cookie.remove('userName');
        },
        refreshToken: (state) => {
            // Bu reducer'ın işlevselliği aşağıda tanımlanacak thunk ile gerçekleştirilecek
        },
    },
});

export const { setAccessToken, setRefreshToken, logout, refreshToken } = authSlice.actions;
export default authSlice.reducer;

export const refreshTokenRequest = () => async (dispatch: Dispatch) => {
    const refreshToken = Cookie.get('refreshToken');
    const response = await fetch('​/api​/Auth​/RefreshTokenLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
    });
    const data = await response.json();
    dispatch(setAccessToken(data.accessToken));
};
