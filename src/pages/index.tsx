import React from "react";
import { useQuery } from "react-query";
import { API } from "../services/index";

const HomePage = () => {
  const AuthLogin = async () => {
    const response = await API.post("/api/v1/auth-login", {
      usernameOrEmail: "malikozturkk",
      password: "123",
    });
    return response;
  };
  const { data, isLoading } = useQuery("AuthLogin", AuthLogin);
  console.log(data, "data burada");
  return <div>homepage</div>;
};

export default HomePage;
