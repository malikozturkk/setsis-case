import { MiddlewareAPI, Dispatch, AnyAction } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// export const checkTokenExpiryMiddleware = (api: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
//     const accessToken = Cookie.get('accessToken');
//     if (accessToken && tokenExpired(accessToken)) {
//         api.dispatch(refreshToken());
//     }
//     return next(action);
// };

// function tokenExpired(token: string): boolean {
//     const decodedToken: any = jwtDecode(token);
//     return (decodedToken.exp < Date.now() / 1000);
// }
