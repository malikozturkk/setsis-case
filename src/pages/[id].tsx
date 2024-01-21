import React from "react";
import { useRouter } from "next/router";
import {
  useGetByCategoryIdQuery,
  useGetAllCategoriesQuery,
} from "@/store/apiSlice";
import Skeleton from "react-loading-skeleton";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {
  NavigateNext,
  NavigateBefore,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ProductCard from "@/components/ProductCard";
import CustomDialog from "@/components/CustomDialog";
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
    isError,
    isLoading,
    //@ts-ignore
  } = useGetByCategoryIdQuery({ pageNumber: page, CategoryId: id });

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
        {isLoading ? (
          Array(4)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} width={280} height={240} />
            ))
        ) : getByCategoryId?.products?.length < 1 ? (
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia title="green iguana" className="flex justify-center">
              <SentimentVeryDissatisfied
                width={200}
                height={200}
                style={{ width: "200px", height: "200px", fill: "#d32f2f" }}
              />
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="text-mui-red font-bold"
              >
                Üzgünüz...
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-lg"
              >
                Bu Kategoriye Ait Herhangi Bir Ürün Bulunamadı. Ürünler
                Sayfasından Ekleyebilirsiniz.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href="/products">
                Ürünler
              </Button>
            </CardActions>
          </Card>
        ) : (
          getByCategoryId?.products.map((product: any) => (
            <ProductCard
              key={product.id}
              allCategories={allCategories}
              data={product}
              formMethods={formMethods}
              edit={edit}
              setEdit={setEdit}
            />
          ))
        )}
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
