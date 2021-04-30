import axios from "axios";

const axiosInstance = axios.create({
  validateStatus: (status: number) => status >= 200 && status <= 500,
});

export default axiosInstance;
