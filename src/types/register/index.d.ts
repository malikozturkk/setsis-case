export interface RegisterResponse {
    token: {
      accessToken: string;
      refreshToken: string;
      expiration: string;
    };
  }

export interface RegisterPayload {
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
}