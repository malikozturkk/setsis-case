import React from "react";
import { Done } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  FormControl,
  Button,
  Snackbar,
  Alert,
} from "@mui/material/";
import { LoadingButton } from "@mui/lab";
import ErrorText from "@/components/ErrorText";
import CustomDialog from "@/components/CustomDialog";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
} from "@/store/apiSlice";
import CategoryCard from "@/components/CategoryCard";

import cookies from "next-cookies";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const allCookies = cookies(context);
  const user = allCookies.accessToken;
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

const Categories = () => {
  const [successCreate, setSuccessCreate] = React.useState<boolean>(false);
  const [newCategory, setNewCategory] = React.useState<boolean>(false);
  const [edit, setEdit] = React.useState<number | null>(null);

  const {
    data: allCategories,
    isLoading,
    isError,
    //@ts-ignore
  } = useGetAllCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation();

  const formMethods = useForm({
    defaultValues: {
      editName: "",
      createName: "",
    },
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = formMethods;

  const onCreate = async (data: any) => {
    createCategory({ name: data.createName });
    setNewCategory(false);
    setSuccessCreate(true);
    reset({ createName: "" });
    clearErrors("createName");
  };

  return isError ? (
    <div>error</div>
  ) : isLoading ? (
    <div>loading</div>
  ) : (
    <div className="px-6 max-w-container mx-auto w-full my-12">
      <div className="w-full flex justify-end mb-12">
        <Button
          variant="contained"
          color="success"
          className="bg-mui-success"
          size="large"
          type="submit"
          onClick={() => setNewCategory(true)}
        >
          Yeni Kategori Ekle
        </Button>
        <CustomDialog
          open={newCategory}
          title="Yeni Kategori Ekle"
          message={
            <div className="flex gap-4 flex-col">
              Yeni Kategori İsmi İçin Aşağıda Bulunan Alana İsmi Yazınız
              <form onSubmit={handleSubmit(onCreate)} className="flex gap-4">
                <Controller
                  name="createName"
                  control={control}
                  render={({ field }) => (
                    <FormControl variant="outlined">
                      <TextField
                        {...field}
                        error={errors?.createName ? true : false}
                        color="success"
                        {...register("createName", {
                          required: true,
                        })}
                        id="outlined-basic"
                        label="Kategori İsmi"
                        variant="outlined"
                      />
                      {errors.createName && (
                        <ErrorText message="Kategori İsmi Zorunlu" />
                      )}
                    </FormControl>
                  )}
                />
                <LoadingButton
                  size="large"
                  type="submit"
                  loading={false}
                  variant="contained"
                  color="success"
                  className="bg-mui-success h-14"
                >
                  Onayla <Done />
                </LoadingButton>
              </form>
            </div>
          }
          onClose={() => {
            setNewCategory(false);
            reset({ createName: "" });
            clearErrors("createName");
          }}
        />
      </div>
      <Snackbar
        open={successCreate}
        autoHideDuration={3000}
        onClose={() => setSuccessCreate(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSuccessCreate(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Kategori başarıyla eklendi.
        </Alert>
      </Snackbar>
      <div className="flex items-center flex-wrap justify-center gap-12">
        {allCategories?.categories.map((category: any) => (
          <CategoryCard
            data={category}
            formMethods={formMethods}
            edit={edit}
            setEdit={setEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
