import React from "react";
import { useRouter } from "next/router";
import {
  useGetByCategoryIdQuery,
  useGetAllCategoriesQuery,
} from "@/store/apiSlice";
import Skeleton from "react-loading-skeleton";
import { Button } from "@mui/material";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ProductCard from "@/components/ProductCard";
import CustomDialog from "@/components/CustomDialog";

export default function CategoryPage() {
  const [page, setPage] = React.useState<number>(1);
  const [edit, setEdit] = React.useState<number | null>(null);
  const [errorModal, setErrorModal] = React.useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const {
    data: getByCategoryId,
    isLoading,
    isError,
    //@ts-ignore
  } = useGetByCategoryIdQuery(page, id);

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

  const disabled = getByCategoryId?.products?.length === 0;

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

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
      <div className="flex items-center flex-wrap justify-center gap-12">
        {isLoading
          ? Array(5)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} width={280} height={240} />
              ))
          : getByCategoryId?.products.map((product: any) => (
              <ProductCard
                key={product.id}
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
}
