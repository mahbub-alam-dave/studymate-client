import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_api_url}`,
});

const UseAxiosSecure = () => {

  axiosInstance.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401 || error.status === 403) {
        // logout the user
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default UseAxiosSecure;
