import React from "react";
import dayjs from "dayjs";
import { DateRange, Edit, Done, Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { TextField, FormControl, Button } from "@mui/material/";
import { LoadingButton } from "@mui/lab";
import ErrorText from "@/components/ErrorText";
import CustomDialog from "@/components/CustomDialog";

const allCategories = {
  categories: [
    {
      categoryName: "meyve34",
      products: null,
      id: 1,
      createdDate: "2023-09-25T09:28:48.5618739",
    },
    {
      categoryName: "Ekmek ve Tahıllar2",
      products: null,
      id: 2,
      createdDate: "2023-09-25T20:25:05.7904936",
    },
    {
      categoryName: "Create deneme",
      products: null,
      id: 3,
      createdDate: "2024-01-19T05:30:25.2473257",
    },
    {
      categoryName: "Create deneme",
      products: null,
      id: 4,
      createdDate: "2024-01-19T05:30:25.2473257",
    },
    {
      categoryName: "Create deneme",
      products: null,
      id: 5,
      createdDate: "2024-01-19T05:30:25.2473257",
    },
  ],
};

const Categories = () => {
  const [edit, setEdit] = React.useState<number | null>(null);
  const [deleteCategory, setDeleteCategory] = React.useState<number | null>(
    null
  );

  const formMethods = useForm({
    defaultValues: {
      editName: "",
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

  const onSubmit = async (data: any) => {
    console.log(data.editName, "yeni kategori ismi");
    console.log(edit, "payloadda gönderilecek id");
    reset();
    clearErrors();
    setEdit(null);
  };

  return (
    <div className="px-6 max-w-container mx-auto w-full my-12">
      <div className="w-full flex justify-end mb-12">
        <Button
          variant="contained"
          color="success"
          className="bg-mui-success"
          size="large"
          type="submit"
        >
          Yeni Kategori Ekle
        </Button>
      </div>
      <div className="flex items-center flex-wrap justify-between gap-12">
        {allCategories.categories.map((category) => (
          <>
            <div
              key={category.id}
              className="flex rounded-lg items-center w-1/5 box-border p-4 flex-col gap-5 shadow-card min-w-72 max-sm:w-full max-md:w-custom"
            >
              {edit === category.id ? (
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setEdit(null), clearErrors(), reset();
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
                      setEdit(category.id), clearErrors(), reset();
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
                onClick={() => setDeleteCategory(category.id)}
              >
                Sil
              </Button>
            </div>
            <CustomDialog
              open={deleteCategory === category.id}
              title="Silmek İstediğinize Emin Misiniz ?"
              message={`Seçtiğiniz Kategori Tamamen Silinecektir ve Bir Daha Asla Geri Getirilemeyecektir. Seçtiğiniz Kategori İsmi : ${category.categoryName}`}
              onClose={() => {
                setDeleteCategory(null);
              }}
              handleOnSubmit={() => {
                console.log(deleteCategory, "silinecek category idsi");
              }}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Categories;