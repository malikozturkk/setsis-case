import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SentimentVeryDissatisfied, InsertEmoticon } from "@mui/icons-material";
import useAuth from "@/hooks/useAuth";
import { useGetAllCategoriesQuery } from "@/store/apiSlice";
import { AllCategoryProps } from "@/types/category";

const HomePage = () => {
  const {
    data: allCategories,
    isLoading,
    isError,
    //@ts-ignore
  } = useGetAllCategoriesQuery();
  const { user, userName } = useAuth();
  return (
    <div className="flex my-9	justify-center flex-col	items-center gap-5	">
      {user ? (
        <>
          {!isError && (
            <>
              <h1 className="font-bold text-xl">
                Kategori Bazında Ürünleri Görmek İçin
              </h1>
              <div className="border-4 border-mui-hovered-blue rounded-lg">
                {allCategories?.categories.map((category: AllCategoryProps) => (
                  <Button href={`/${category.id}`} key={category.id}>
                    {category.categoryName}
                  </Button>
                ))}
              </div>
            </>
          )}
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia title="green iguana" className="flex justify-center">
              <InsertEmoticon
                width={200}
                height={200}
                style={{ width: "200px", height: "200px", fill: "#2e7d32" }}
              />
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="text-mui-success font-bold"
              >
                Hoşgeldin {userName.toLowerCase()} !
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-lg"
              >
                Kategorilere veya Ürünlere Erişmek İçin Aşağıdaki Butonlara
                Tıklayabilirsiniz.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href="/categories">
                Kategoriler
              </Button>
              <Button size="small" href="/products">
                Ürünler
              </Button>
            </CardActions>
          </Card>
        </>
      ) : (
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
              Kategorilere veya Ürünlere Erişmek İçin Giriş Yapmış Olmanız
              Gerekmektedir. Hesabınız Yoksa Üye Olabilirsiniz.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/login">
              Giriş Yap
            </Button>
            <Button size="small" href="/register">
              Üye Ol
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default HomePage;
