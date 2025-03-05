import axios from "axios";
import { config } from ".";
import Cookies from "js-cookie";

axios.defaults.baseURL = config.BACKEND_URL + '/api/';
axios.interceptors.request.use((config: any) => {
  const token = Cookies.get("access_token")
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const restApi = {
  postRequest: async (url: string, data?: any) => {
    try {
      const res = await axios.post(url, data);
      return res
    } catch (error: any) {
      console.error("Error response:", error.response); 
      return error.response.data;
    }
  }
}

export { restApi };