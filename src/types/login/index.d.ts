export interface LoginResponse {
    token: {
      accessToken: string;
      refreshToken: string;
      expiration: string;
    };
  }

export interface LoginPayload {
  usernameOrEmail: string
  password: string
}