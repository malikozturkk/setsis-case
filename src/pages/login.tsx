import React from "react";
import { useForm, Controller } from "react-hook-form";
import { API } from "../services/index";
import { useMutation } from "react-query";
import Cookies from "js-cookie";
import {
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Grid,
} from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorText from "@/components/ErrorText";
import CustomDialog from "@/components/CustomDialog";

const AuthLogin = async (usernameOrEmail: string, password: string) => {
  const response = await API.post("/api/v1/auth-login", {
    usernameOrEmail,
    password,
  });
  return response;
};

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const formMethods = useForm({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const handleLogin = useMutation(
    (data: { usernameOrEmail: string; password: string }) =>
      AuthLogin(data.usernameOrEmail, data.password),
    {
      onSuccess: (response) => {
        if (response.token) {
          Cookies.set("accessToken", response.token.accessToken);
          Cookies.set("refreshToken", response.token.refreshToken);
          Cookies.set("userName", formMethods.watch("usernameOrEmail"));
          setSuccess(true);
        } else {
          setError(true);
        }
      },
      onError: (error) => {
        setError(true);
        console.error("Login Error:", error);
      },
    }
  );

  const onSubmit = async (data: any) => {
    handleLogin.mutate({
      usernameOrEmail: data.usernameOrEmail as string,
      password: data.password as string,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-mui-blue">
        <div className="flex flex-col items-center justify-center h-dvh">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-7 gap-5">
            <h1 className="text-xl font-bold">Giriş Yap</h1>
            <Controller
              name="usernameOrEmail"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <TextField
                    {...field}
                    error={errors?.usernameOrEmail ? true : false}
                    color="success"
                    {...register("usernameOrEmail", {
                      required: true,
                      minLength: 4,
                    })}
                    id="outlined-basic"
                    label="Kullanıcı Adı"
                    variant="outlined"
                  />
                  {errors.usernameOrEmail ? (
                    errors.usernameOrEmail?.type === "required" ? (
                      <ErrorText message="Kullanıcı Adı veya Email Zorunlu" />
                    ) : (
                      <ErrorText message="Kullanıcı Adı veya Email Minimum 4 Karakter Olmalı" />
                    )
                  ) : null}
                </FormControl>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel
                    error={errors.password ? true : false}
                    color="success"
                    htmlFor="outlined-adornment-password"
                  >
                    Şifre
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    {...register("password", { required: true, minLength: 4 })}
                    id="outlined-adornment-password"
                    error={errors.password ? true : false}
                    color="success"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff color={errors.password && "error"} />
                          ) : (
                            <Visibility color={errors.password && "error"} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {errors.password ? (
                    errors.password?.type === "required" ? (
                      <ErrorText message="Şifre Zorunlu" />
                    ) : (
                      <ErrorText message="Şifreniz Minimum 4 Karakter Olmalı" />
                    )
                  ) : null}
                </FormControl>
              )}
            />
            <LoadingButton
              className="bg-mui-blue"
              size="large"
              type="submit"
              loading={handleLogin.isLoading}
              variant="contained"
              fullWidth
            >
              Giriş Yap
            </LoadingButton>
            <div className="flex p-0 justify-between w-full">
              <Grid item xs={12} sm={6} md={6}>
                <Button href="/register" variant="outlined">
                  Üye Ol
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Button variant="outlined">Şifremi Unuttum</Button>
              </Grid>
            </div>
          </div>
        </div>
      </form>
      <CustomDialog
        open={success}
        onClose={() => {
          setSuccess(false);
          window.location.pathname = "/";
        }}
        title="Başarıyla Giriş Yapıldı"
        message="Ana sayfaya yönlendiriliyorsunuz."
      />
      <CustomDialog
        open={error}
        onClose={() => setError(false)}
        title="Giriş Yapılırken Hata Oluştu"
        message="Kullanıcı adı veya şifre yanlış, lütfen tekrar deneyin. Tekrar hata
        alırsanız 0555 555 55 55 numaralı hattı arayın."
      />
    </>
  );
};

export default Login;
