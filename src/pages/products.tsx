import React from "react";
import { useForm } from "react-hook-form";
import { Button, Snackbar, Alert } from "@mui/material/";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import CustomDialog from "@/components/CustomDialog";
import Skeleton from "react-loading-skeleton";
import {
  useGetAllProductsQuery,
  useGetAllCategoriesQuery,
  useGetByCategoryIdQuery,
} from "@/store/apiSlice";
import ProductCard from "@/components/ProductCard";
import EditOrCreateCard from "@/components/ProductCard/EditOrCreateCard";
import cookies from "next-cookies";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const allCookies = cookies(context);
  const user = allCookies.accessToken;
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

const Categories = () => {
  const [successCreate, setSuccessCreate] = React.useState<boolean>(false);
  const [newProduct, setNewProduct] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);
  const [edit, setEdit] = React.useState<number | null>(null);
  const [errorModal, setErrorModal] = React.useState<boolean>(false);

  const {
    data: allProducts,
    isLoading,
    isError,
    //@ts-ignore
  } = useGetAllProductsQuery(page);

  const disabled = allProducts?.products?.length === 0;

  const {
    data: getByCategoryId,
    //@ts-ignore
  } = useGetByCategoryIdQuery(page, 326);
  console.log(getByCategoryId, "getByCategoryId");

  const {
    data: allCategories,
    //@ts-ignore
  } = useGetAllCategoriesQuery();

  const formMethods = useForm({
    defaultValues: {
      createName: "",
      createPrice: "",
      createStock: "",
      createCategoryId: "",
    },
  });

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const { reset, clearErrors } = formMethods;

  return isError ? (
    <CustomDialog
      open={true}
      title="Hata Var !"
      message="Session süresi veya başka bir sebepten apiye ulaşılamadı."
      onClose={() => {
        setErrorModal(false);
        window.location.pathname = "/";
      }}
    />
  ) : (
    <div className="px-6 max-w-container mx-auto w-full my-12">
      <div className="w-full flex justify-end mb-12">
        {isLoading ? (
          <Skeleton width={175} height={42} />
        ) : (
          <Button
            variant="contained"
            color="success"
            className="bg-mui-success"
            size="large"
            type="submit"
            onClick={() => setNewProduct(true)}
          >
            Yeni Ürün Ekle
          </Button>
        )}
        <CustomDialog
          open={newProduct}
          title="Yeni Ürün Ekle"
          message={
            <div>
              Yeni Ürün Bilgilerini Aşağıya Yazınız.
              <EditOrCreateCard
                allCategories={allCategories}
                closeDialog={setNewProduct}
                setSuccessCreate={setSuccessCreate}
                formMethods={formMethods}
                type="create"
              />
            </div>
          }
          onClose={() => {
            setNewProduct(false);
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
          Ürün başarıyla eklendi.
        </Alert>
      </Snackbar>
      <div className="flex items-center flex-wrap justify-center gap-12">
        {isLoading
          ? Array(5)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} width={280} height={240} />
              ))
          : allProducts?.products.map((product: any) => (
              <ProductCard
                allCategories={allCategories}
                data={product}
                formMethods={formMethods}
                edit={edit}
                setEdit={setEdit}
              />
            ))}
      </div>
      <div className="flex justify-center items-center mt-12 gap-5">
        {isLoading ? (
          <Skeleton width={150} height={36} />
        ) : (
          <Button disabled={page === 1} onClick={handlePreviousPage}>
            <NavigateBefore /> Önceki Sayfa
          </Button>
        )}

        {/* TODO: Api response unda sonraki sayfanın olup olmadığı bilgisi dönmediği için sonraki sayfa butonu ancak böyle disabled yapılınabiliyor. */}
        {isLoading ? (
          <Skeleton width={150} height={36} />
        ) : (
          <Button disabled={disabled} onClick={handleNextPage}>
            Sonraki Sayfa <NavigateNext />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Categories;
