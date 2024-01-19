import React from "react";
import dayjs from "dayjs";
import { DateRange, Edit, Done, Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { TextField, FormControl, Button } from "@mui/material/";
import { LoadingButton } from "@mui/lab";
import ErrorText from "@/components/ErrorText";
import CustomDialog from "@/components/CustomDialog";
import useAuth from "@/hooks/useAuth";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/apiSlice";

const Categories = () => {
  const { user } = useAuth();
  const [edit, setEdit] = React.useState<number | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = React.useState<number | null>(
    null
  );
  const [newCategory, setNewCategory] = React.useState<boolean>(false);

  const {
    data: allCategories,
    isLoading,
    isError,
    //@ts-ignore
  } = useGetAllCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

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

  const onEdit = async (data: any) => {
    updateCategory({ id: edit, name: data.editName });
    reset({ editName: "" });
    clearErrors("editName");
    setEdit(null);
  };

  const onCreate = async (data: any) => {
    createCategory({ name: data.createName });
    setNewCategory(false);
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
      <div className="flex items-center flex-wrap justify-center gap-12">
        {allCategories?.categories.map((category: any) => (
          <>
            <div
              key={category.id}
              className="flex rounded-lg items-center w-1/5 box-border p-4 flex-col min-h-60 justify-center gap-5 shadow-card min-w-72 max-sm:w-full max-md:w-custom"
            >
              {edit === category.id ? (
                <form onSubmit={handleSubmit(onEdit)} className="flex gap-4">
                  <Button
                    className="h-14"
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setEdit(null), reset({ editName: "" });
                      clearErrors("editName");
                    }}
                  >
                    <Close />
                  </Button>
                  <Controller
                    name="editName"
                    control={control}
                    render={({ field }) => (
                      <FormControl variant="outlined">
                        <TextField
                          {...field}
                          error={errors?.editName ? true : false}
                          color="success"
                          {...register("editName", {
                            required: true,
                          })}
                          id="outlined-basic"
                          label="Kategori İsmi"
                          variant="outlined"
                        />
                        {errors.editName && (
                          <ErrorText message="Kategori İsmi Zorunlu" />
                        )}
                      </FormControl>
                    )}
                  />
                  <LoadingButton
                    size="large"
                    type="submit"
                    loading={false}
                    color="success"
                    className="h-14"
                    variant="outlined"
                    onClick={() => setEdit(category.id)}
                  >
                    <Done />
                  </LoadingButton>
                </form>
              ) : (
                <h2 className="text-xl font-bold flex gap-4">
                  {category.categoryName}
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEdit(category.id), reset({ editName: "" });
                      clearErrors("editName");
                    }}
                  >
                    <Edit />
                  </Button>
                </h2>
              )}
              <span>
                <DateRange />
                {dayjs(category.createdDate).format("DD MMMM YYYY HH:mm")}
              </span>
              <Button
                variant="contained"
                color="error"
                className="bg-mui-red w-1/2"
                type="submit"
                onClick={() => setDeleteCategoryId(category.id)}
              >
                Sil
              </Button>
            </div>
            <CustomDialog
              open={deleteCategoryId === category.id}
              title="Silmek İstediğinize Emin Misiniz ?"
              message={`Seçtiğiniz Kategori Tamamen Silinecektir ve Bir Daha Asla Geri Getirilemeyecektir. Seçtiğiniz Kategori İsmi : ${category.categoryName}`}
              onClose={() => {
                setDeleteCategoryId(null);
              }}
              handleOnSubmit={() => {
                deleteCategory({ id: category.id });
              }}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Categories;
