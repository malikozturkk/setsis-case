import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "@/services";
import { LoginPayload } from "@/types/login";
import { ReduxStates } from "@/types/auth";

const useAuth = () => {
  const [logIn, { isLoading, isError, data }] = useLogInMutation();

  const dispatch = useDispatch();

  const authState = useSelector((state: ReduxStates) => state.auth);

  const loginUser = async (loginData: LoginPayload) => {
    try {
      const result = await logIn(loginData).unwrap();
      return result;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const logOutUser = () => {
    dispatch({ type: "logOut" });
  };

  return {
    ...authState,
    isLoading,
    isError,
    data,
    loginUser,
    logOutUser,
  };
};

export default useAuth;
