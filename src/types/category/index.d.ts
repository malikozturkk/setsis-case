import { UseFormReturn } from "react-hook-form";
import React from "react";

type CategoryData = {
    id: number;
    categoryName: string;
    createdDate: string;
  };

  export type FormData = {
    editName?: string;
    createName?: string;
  };
  
  type FormMethods = UseFormReturn<any>;
  type EditState = number | null;
  type SetEdit = React.Dispatch<React.SetStateAction<EditState>>;
  
export interface CategoryCardProps {
    data: CategoryData;
    formMethods: FormMethods;
    edit: EditState;
    setEdit: SetEdit;
}

export type CategoryMapperProps = {
  label: string;
  categoryId: number;
};

export interface AllCategoryProps {
    categoryName: string 
    createdDate: string
    id: number
    products: null
}