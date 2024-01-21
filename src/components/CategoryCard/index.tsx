import React from "react";
import dayjs from "dayjs";
import { DateRange, Edit, Done, Close } from "@mui/icons-material";
import { Controller } from "react-hook-form";
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
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/store/apiSlice";
import { CategoryCardProps, FormData } from "@/types/category";

const CategoryCard: React.FC<CategoryCardProps> = ({
  data,
  formMethods,
  edit,
  setEdit,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = formMethods;
  const [deleteCategoryId, setDeleteCategoryId] = React.useState<number | null>(
    null
  );
  const [successDelete, setSuccessDelete] = React.useState<boolean>(false);
  const [successEdit, setSuccessEdit] = React.useState<boolean>(false);

  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const onEdit = async (data: FormData) => {
    updateCategory({ id: edit, name: data.editName });
    setSuccessEdit(true);
    reset({ editName: "" });
    clearErrors("editName");
    setEdit(null);
  };

  return (
    <>
      <div
        key={data.id}
        className="flex rounded-lg items-center w-1/5 box-border p-4 flex-col min-h-60 justify-center gap-5 shadow-card min-w-72 max-sm:w-full max-md:w-custom"
      >
        <Snackbar
          open={successEdit}
          autoHideDuration={3000}
          onClose={() => setSuccessEdit(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSuccessEdit(false)}
            severity="info"
            sx={{ width: "100%" }}
          >
            Kategori başarıyla düzenlendi.
          </Alert>
        </Snackbar>
        {edit === data.id ? (
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
                    label={`Kategori İsmi`}
                    variant="outlined"
                  />
                  {errors.editName && (
                    <ErrorText message={`Kategori İsmi Zorunlu`} />
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
              onClick={() => setEdit(data.id)}
            >
              <Done />
            </LoadingButton>
          </form>
        ) : (
          <h2 className="text-xl font-bold flex gap-4">
            {data.categoryName}
            <Button
              variant="outlined"
              onClick={() => {
                setEdit(data.id), reset({ editName: "" });
                clearErrors("editName");
              }}
            >
              <Edit />
            </Button>
          </h2>
        )}
        <span>
          <DateRange />
          {dayjs(data.createdDate).format("DD MMMM YYYY HH:mm")}
        </span>
        <Button
          variant="contained"
          color="error"
          className="bg-mui-red w-1/2"
          type="submit"
          onClick={() => {
            setDeleteCategoryId(data.id);
          }}
        >
          Sil
        </Button>
      </div>
      <CustomDialog
        open={deleteCategoryId === data.id}
        title="Silmek İstediğinize Emin Misiniz ?"
        message={`Seçtiğiniz Kategori Tamamen Silinecektir ve Bir Daha Asla Geri Getirilemeyecektir. Seçtiğiniz Kategori İsmi : ${data.categoryName}`}
        onClose={() => {
          setDeleteCategoryId(null);
        }}
        handleOnSubmit={() => {
          deleteCategory({ id: data.id });
          setSuccessDelete(true);
        }}
      />
      <Snackbar
        open={successDelete}
        autoHideDuration={3000}
        onClose={() => setSuccessDelete(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSuccessDelete(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Kategori başarıyla silindi.
        </Alert>
      </Snackbar>
    </>
  );
};

export default CategoryCard;
