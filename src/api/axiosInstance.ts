import axios from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

const axiosConfig = axios.create({
  baseURL: "https://fakestoreapi.com",
  httpsAgent: config
});

export default axiosConfig;