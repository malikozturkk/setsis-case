import React from "react";
import { Done } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import {
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material/";
import { LoadingButton } from "@mui/lab";
import ErrorText from "@/components/ErrorText";
import Autocomplete from "@mui/material/Autocomplete";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/store/apiSlice";

const EditOrCreateCard = ({
  allCategories,
  closeDialog,
  setSuccessCreate,
  formMethods,
  type,
  edit,
}: any) => {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = formMethods;

  const categories = allCategories?.categories.map((category: any) => ({
    label: category.categoryName,
    categoryId: category.id,
  }));

  function findCategoryIdByLabel(label: any) {
    const category = categories.find((c: any) => c.label === label);
    return category ? category.categoryId : undefined;
  }

  const onCreate = async (data: any) => {
    createProduct({
      name: data.createName,
      price: data.createPrice,
      stock: data.createStock,
      categoryId: findCategoryIdByLabel(data.createCategoryId),
    });
    closeDialog(false);
    setSuccessCreate(true);
    reset();
    clearErrors();
  };

  const onUpdate = async (data: any) => {
    updateProduct({
      name: data.createName,
      price: parseInt(data.createPrice),
      stock: parseInt(data.createStock),
      id: edit,
    });
    closeDialog(false);
    setSuccessCreate(true);
    reset();
    clearErrors();
  };

  return (
    <form
      onSubmit={handleSubmit(type === "create" ? onCreate : onUpdate)}
      className="flex gap-4 flex-col mt-4"
    >
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
              label="Ürün İsmi"
              variant="outlined"
            />
            {errors.createName && <ErrorText message="Ürün İsmi Zorunlu" />}
          </FormControl>
        )}
      />
      <Controller
        name="createCategoryId"
        control={control}
        render={({ field }) => (
          <FormControl variant="outlined">
            <Autocomplete
              disablePortal
              id="combo-box-category"
              options={categories}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Kategori Seçiniz"
                  {...field}
                  error={errors?.createCategoryId ? true : false}
                  color="success"
                  {...register("createCategoryId", {
                    required: true,
                  })}
                  id="outlined-basic"
                  variant="outlined"
                />
              )}
            />
            {errors.createCategoryId && (
              <ErrorText message="Kategori Seçimi Zorunlu" />
            )}
          </FormControl>
        )}
      />

      <Controller
        name="createPrice"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel
              htmlFor="outlined-adornment-amount"
              error={errors?.createPrice ? true : false}
              color="success"
            >
              Tutar
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              {...field}
              error={errors?.createPrice ? true : false}
              color="success"
              {...register("createPrice", {
                required: true,
              })}
              label="Ürün Tutarı"
              startAdornment={
                <InputAdornment position="start">₺</InputAdornment>
              }
            />
            {errors.createPrice && <ErrorText message="Fiyat Seçimi Zorunlu" />}
          </FormControl>
        )}
      />

      <Controller
        name="createStock"
        control={control}
        render={({ field }) => (
          <FormControl variant="outlined">
            <TextField
              {...field}
              error={errors?.createStock ? true : false}
              color="success"
              {...register("createStock", {
                required: true,
              })}
              id="outlined-basic"
              label="Stok Adedi"
              variant="outlined"
            />
            {errors.createStock && <ErrorText message="Stok Adedi Zorunlu" />}
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
  );
};

export default EditOrCreateCard;
