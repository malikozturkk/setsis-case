import React from "react";
import { useQuery } from "react-query";
import { API } from "../services/index";

const Categories = () => {
  const GetAllCategories = async () => {
    const response = await API.get("/api/v1/get-all-categories");
    return response;
  };
  const { data, isLoading } = useQuery("AuthLogin", GetAllCategories);
  console.log(data, "data buradaa");
  return (
    <div>
      <div>
        {isLoading && <div>loading</div>}
        homepage
      </div>
    </div>
  );
};

export default Categories;
