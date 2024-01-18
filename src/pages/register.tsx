import React from "react";
import { useQuery } from "react-query";
import { API } from "../services/index";

const Register = () => {
  //server request
  // const AuthRegister = async () => {
  //   const response = await API.post("/api/v1/auth-register", {
  //     username: "malikozturkk",
  //     firstname: "malik",
  //     lastname: "öztürk",
  //     email: "malikozturk975@gmail.com",
  //     password: "12345",
  //   });
  //   return response;
  // };

  //client request
  // const AuthRegister = async (params: any) => {
  //   return await API.post("http://lisans.setsis.com:1468/api/User", {
  //     username: "malikozturkk1",
  //     firstname: "malik",
  //     lastname: "öztürk",
  //     email: "malikozturk9715@gmail.com",
  //     password: "12345",
  //   });
  // };
  //const { data, isLoading, isError } = useQuery("AuthRegister", AuthRegister);
  return (
    <div>
      <h1>Register</h1>
    </div>
  );
};

export default Register;
