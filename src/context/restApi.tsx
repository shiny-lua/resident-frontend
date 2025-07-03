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
      // For FormData, don't set Content-Type header - let axios handle it
      const config: any = {};
      
      if (!(data instanceof FormData)) {
        config.headers = {
          'Content-Type': 'application/json'
        };
      }
      
      const res = await axios.post(url, data, config);
      return res
    } catch (error: any) {
      console.error("Error response:", error.response); 
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  }
}

export { restApi };