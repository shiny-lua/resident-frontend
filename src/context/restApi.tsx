import axios from "axios";
import { config } from ".";

axios.defaults.baseURL = config.BACKEND_URL + '/api/';
axios.defaults.withCredentials = true;

const restApi = {
  postRequest: async (url: string, data?: any) => {
    try {
      const res = await axios.post(url, data);
      return res
    } catch (error: any) {
      return error.response.data
    }
  },

  setAuthToken: (token: string) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  loginStatus: async (authToken: any) => {
    const res = await axios.post("loginStatus", {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    })
    console.log(res)

    return res.data
  },
}

export { restApi };