import React from "react";
import { useForm, Controller } from "react-hook-form";
import { API } from "../services/index";
import { useMutation } from "react-query";
import {
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Grid,
  Container,
} from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorText from "@/components/ErrorText";
import CustomDialog from "@/components/CustomDialog";

const url = process.env.NEXT_PUBLIC_SETSIS_API_URL;
const AuthLogin = async (usernameOrEmail: string, password: string) => {
  const response = await API.post(`${url}/Auth/Login`, {
    usernameOrEmail,
    password,
  });
  return response;
};

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [show, setShow] = React.useState(false);
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
        if (response.successed) {
          console.log(response, "response");
        } else {
          setShow(true);
        }
      },
      onError: (error) => {
        setShow(true);
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
            <Container className="p-0 flex justify-between">
              <Grid item xs={12} sm={6} md={6}>
                <Button href="/register" variant="outlined">
                  Üye Ol
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Button variant="outlined">Şifremi Unuttum</Button>
              </Grid>
            </Container>
          </div>
        </div>
      </form>
      <CustomDialog
        open={show}
        onClose={() => setShow(false)}
        title="Giriş Yapılırken Hata Oluştu"
      />
    </>
  );
};

export default Login;
