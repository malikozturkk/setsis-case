//server request
// const AuthRegister = async () => {
//   const response = await API.post("/api/v1/auth-register", {
//     username: "malikozturkk",
//     firstname: "malik",
//     lastname: "öztürk",
//     email: "malikozturk975@gmail.com",
//     password: "12345",
//   });
//   return response;
// };

//client request
// const AuthRegister = async (params: any) => {
//   return await API.post("http://lisans.setsis.com:1468/api/User", {
//     username: "malikozturkk1",
//     firstname: "malik",
//     lastname: "öztürk",
//     email: "malikozturk9715@gmail.com",
//     password: "12345",
//   });
// };
//const { data, isLoading, isError } = useQuery("AuthRegister", AuthRegister);

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { API } from "../services/index";
import {
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const url = process.env.NEXT_PUBLIC_SETSIS_API_URL;

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const formMethods = useForm({
    defaultValues: {
      username: "",
      firstname: "",
      password: "",
      lastname: "",
      email: "",
    },
  });

  const errorText = (message: string) => {
    return (
      <div className="text-mui-red text-xs mt-1 font-semibold">{message}</div>
    );
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      setLoading(false);
      return await API.post(`${url}/User`, {
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-mui-blue">
      <div className="flex flex-col items-center justify-center h-dvh">
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-7 gap-5">
          <h1 className="text-xl font-bold	">Üye Ol</h1>
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
                {errors.username
                  ? errors.username?.type === "required"
                    ? errorText("Kullanıcı Adı Zorunlu")
                    : errorText("Kullanıcı Adı Minimum 4 Karakter Olmalı")
                  : null}
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
                {errors.firstname && errorText("İsim Zorunlu")}
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
                {errors.lastname && errorText("Soyisim Zorunlu")}
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
                {errors.email
                  ? errors.email.type === "required"
                    ? errorText("Email Zorunlu")
                    : errorText("Email Formatı Doğru Değil")
                  : null}
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
                {errors.password
                  ? errors.password?.type === "required"
                    ? errorText("Şifre Zorunlu")
                    : errorText("Şifreniz Minimum 4 Karakter Olmalı")
                  : null}
              </FormControl>
            )}
          />
          <LoadingButton
            className="bg-mui-blue"
            size="large"
            type="submit"
            loading={loading}
            variant="contained"
            fullWidth
          >
            Giriş Yap
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};

export default Register;
