import axios from "axios";
import { auth } from "../firebase/firebase.init";

const axiosSecure = axios.create();

axiosSecure.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    config.headers.Authorization = `Bearer ${await user.getIdToken()}`;
  }
  return config;
});

const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
