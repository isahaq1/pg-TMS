import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://164.52.205.7/PAPI",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
