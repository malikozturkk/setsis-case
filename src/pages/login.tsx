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

const Login = () => {
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
      usernameOrEmail: "",
      password: "",
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
    if (data.usernameOrEmail !== "" && data.password !== "") {
      setLoading(true);
      try {
        setLoading(false);
        return await API.post(`${url}/Auth/Login`, {
          usernameOrEmail: data.usernameOrEmail,
          password: data.password,
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-mui-blue">
      <div className="flex flex-col items-center justify-center h-dvh">
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-7 gap-5">
          <h1 className="text-xl font-bold	">Giriş Yap</h1>
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
                {errors.usernameOrEmail
                  ? errors.usernameOrEmail?.type === "required"
                    ? errorText("Kullanıcı Adı veya Email Zorunlu")
                    : errorText(
                        "Kullanıcı Adı veya Email Minimum 4 Karakter Olmalı"
                      )
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

export default Login;
