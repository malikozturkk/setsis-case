import { CreateAPI } from "../helpers/CreateAPI";
import {
  APIGlobalErrorHandler,
  APIGlobalResponseHandler,
} from "./helper/response-helper";

export function CoreAPI<T>() {
  const SETSIS_API_URL = process.env.SETSIS_API_URL;
  const api = CreateAPI({
    baseURL: SETSIS_API_URL,
  });
  api.interceptors.response.use(
    APIGlobalResponseHandler,
    APIGlobalErrorHandler
  );
  return api;
}

export const API = CoreAPI();

export const AuthLogin = async (params: any) => {
  const { usernameOrEmail, password } = params;
  return await API.post("/Auth/Login", { usernameOrEmail, password });
};

export const AuthRegister = async (params: any) => {
  return await API.post("/User", params);
};
