import { API } from '@/services';

interface LogInParams {
    usernameOrEmail: string;
    password: string;
}


export const logIn = async ({ usernameOrEmail, password}: LogInParams) => {
    try {
          const response = await API.post("/api/v1/auth-login", {
            usernameOrEmail,
            password,
          }); 
          
         const res = await response.json()
         console.log(res, 'result auth')
         return res.data
    } catch (error) {
      return error;
    }
};

