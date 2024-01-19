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
} from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorText from "@/components/ErrorText";
import CustomDialog from "@/components/CustomDialog";
import { RegisterPayload } from "@/types/register";
import useAuth from "@/hooks/useAuth";

const AuthRegister = async (
  username: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  const response = await API.post("/User", {
    username,
    firstname,
    lastname,
    email,
    password,
  });
  return response;
};

const Register = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const formMethods = useForm({
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      email: "",
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const handleRegister = useMutation(
    (data: {
      username: string;
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    }) =>
      AuthRegister(
        data.username,
        data.firstname,
        data.lastname,
        data.email,
        data.password
      ),
    {
      onSuccess: (response) => {
        if (response.succeeded) {
          setSuccess(response.succeeded);
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

  const onSubmit = async (data: RegisterPayload) => {
    handleRegister.mutate({
      username: data.username as string,
      firstname: data.firstname as string,
      lastname: data.lastname as string,
      email: data.email as string,
      password: data.password as string,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-mui-blue">
        <div className="flex flex-col items-center justify-center h-dvh">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-7 gap-5">
            <h1 className="text-xl font-bold">Üye Ol</h1>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <TextField
                    {...field}
                    error={errors?.username ? true : false}
                    color="success"
                    {...register("username", {
                      required: true,
                      minLength: 4,
                    })}
                    id="outlined-basic"
                    label="Kullanıcı Adı"
                    variant="outlined"
                  />
                  {errors.username ? (
                    errors.username?.type === "required" ? (
                      <ErrorText message="Kullanıcı Adı Zorunlu" />
                    ) : (
                      <ErrorText message="Kullanıcı Adı Minimum 4 Karakter Olmalı" />
                    )
                  ) : null}
                </FormControl>
              )}
            />
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <TextField
                    {...field}
                    error={errors?.firstname ? true : false}
                    color="success"
                    {...register("firstname", {
                      required: true,
                    })}
                    id="outlined-basic"
                    label="İsim"
                    variant="outlined"
                  />
                  {errors.firstname && <ErrorText message="İsim Zorunlu" />}
                </FormControl>
              )}
            />
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <TextField
                    {...field}
                    error={errors?.lastname ? true : false}
                    color="success"
                    {...register("lastname", {
                      required: true,
                    })}
                    id="outlined-basic"
                    label="Soyisim"
                    variant="outlined"
                  />
                  {errors.lastname && <ErrorText message="Soyisim Zorunlu" />}
                </FormControl>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <TextField
                    {...field}
                    error={errors?.email ? true : false}
                    color="success"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email Formatı Doğru Değil",
                      },
                    })}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                  />
                  {errors.email ? (
                    errors.email.type === "required" ? (
                      <ErrorText message="Email Zorunlu" />
                    ) : (
                      <ErrorText message="Email Formatı Doğru Değil" />
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
              loading={handleRegister.isLoading}
              variant="contained"
              fullWidth
            >
              Üye Ol
            </LoadingButton>
            <Button variant="outlined" fullWidth href="/login">
              Üyeliğin varsa, giriş yap
            </Button>
          </div>
        </div>
      </form>
      <CustomDialog
        open={success}
        onClose={() => {
          setSuccess(false);
          window.location.pathname = "/login";
        }}
        title="Başarıyla Üye Olundu"
        message="Giriş Sayfasına Yönlendiriliyorsunuz"
      />
      <CustomDialog
        open={show}
        onClose={() => setShow(false)}
        title="Üye Olurken Hata Oluştu"
        message={
          <div
            dangerouslySetInnerHTML={{ __html: handleRegister.data?.message }}
          />
        }
      />
    </>
  );
};

export default Register;
