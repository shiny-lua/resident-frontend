import axios from "axios";
import { config } from ".";

// Set the base URL for Axios
axios.defaults.baseURL = config.BACKEND_URL + '/api/';
axios.defaults.withCredentials = true;

const getToken = () => {
  return localStorage.getItem("authToken"); 
};

const restApi = {
  postRequest: async (url: string, data?: any) => {
    try {
      const token = getToken(); // Get the token
      const res = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': token ? `Bearer ${token}` : ''
        },
        withCredentials: true
      });
      return res
    } catch (error: any) {
      console.error("Error response:", error.response); 
      return error.response.data;
    }
  }
}

export { restApi };