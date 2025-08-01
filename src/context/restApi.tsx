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
  },

  leaveInterview: async (interviewId: string, action: 'leave' | 'in_progress') => {
    try {
      const response = await restApi.postRequest('leave-interview', {
        interview_id: interviewId,
        action: action
      });
      return response;
    } catch (error: any) {
      console.error("Error leaving interview:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  getInterviews: async (params?: {
    page?: number;
    per_page?: number;
    status?: 'active' | 'completed' | 'cancelled';
  }) => {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.status) queryParams.append('status', params.status);

      const url = `get-interviews${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await restApi.postRequest(url);
      return response;
    } catch (error: any) {
      console.error("Error getting interviews:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  createMockInterview: async (mockInterviewData: {
    title?: string;
    resume?: string;
    role?: string;
    domain?: string;
    interview_type?: string;
    scheduled_at?: string;
    timezone?: string;
  }) => {
    try {
      const response = await restApi.postRequest('create-mock-interview', mockInterviewData);
      return response;
    } catch (error: any) {
      console.error("Error creating mock interview:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  leaveMockInterview: async (mockInterviewId: string, action: 'leave' | 'in_progress', feedback?: any) => {
    try {
      const requestData: any = {
        interview_id: mockInterviewId,
        action: action
      };
      
      if (feedback) {
        requestData.feedback = feedback;
      }
      
      const response = await restApi.postRequest('leave-mock-interview', requestData);
      return response;
    } catch (error: any) {
      console.error("Error leaving mock interview:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  getMockInterviews: async (params?: {
    page?: number;
    per_page?: number;
    status?: 'active' | 'completed' | 'cancelled';
  }) => {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.status) queryParams.append('status', params.status);

      const url = `get-mock-interviews${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await restApi.postRequest(url);
      return response;
    } catch (error: any) {
      console.error("Error getting mock interviews:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  }
}

export { restApi };