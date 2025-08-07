import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL + '/api/';
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
  },

  createMockInterviewSession: async (sessionData: {
    specialty: string;
    question_count: number;
    session_name: string;
    description: string;
    resume?: string;
    scheduled_at?: string;
    timezone?: string;
  }) => {
    try {
      const response = await restApi.postRequest('mock-interview-create-session', sessionData);
      return response;
    } catch (error: any) {
      console.error("Error creating mock interview session:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  getMockInterviewSession: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('mock-interview-get-session', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error getting mock interview session:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  startMockInterviewSession: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('mock-interview-start-session', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error starting mock interview session:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  nextMockInterviewQuestion: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('mock-interview-next-question', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error getting next question:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  evaluateMockInterviewResponse: async (sessionCode: string, questionIndex: number, response_text: string) => {
    try {
      const responseData = await restApi.postRequest('mock-interview-evaluate-response', {
        session_code: sessionCode,
        question_index: questionIndex,
        response_text: response_text
      });
      return responseData;
    } catch (error: any) {
      console.error("Error evaluating response:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  endMockInterviewSession: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('mock-interview-end-session', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error ending mock interview session:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  // Voice Mock Interview APIs
  getVoiceQuestionAudio: async (sessionId: string, questionIndex: number) => {
    try {
      const response = await restApi.postRequest('voice-mock-interview-get-question-audio', {
        session_id: sessionId,
        question_index: questionIndex
      });
      return response;
    } catch (error: any) {
      console.error("Error getting voice question audio:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  submitVoiceResponse: async (sessionId: string, questionIndex: number, audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('session_id', sessionId);
      formData.append('question_index', questionIndex.toString());
      formData.append('audio', audioBlob, 'response.wav');

      const response = await restApi.postRequest('voice-mock-interview-submit-voice-response', formData);
      return response;
    } catch (error: any) {
      console.error("Error submitting voice response:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  convertSpeechToText: async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'response.wav');

      const response = await restApi.postRequest('voice-mock-interview-speech-to-text', formData);
      return response;
    } catch (error: any) {
      console.error("Error converting speech to text:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  convertTextToSpeech: async (text: string) => {
    try {
      const response = await restApi.postRequest('voice-mock-interview-text-to-speech', {
        text: text
      });
      return response;
    } catch (error: any) {
      console.error("Error converting text to speech:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  evaluateVoiceResponse: async (sessionId: string, questionIndex: number, responseText: string) => {
    try {
      const response = await restApi.postRequest('voice-mock-interview-evaluate-response', {
        session_id: sessionId,
        question_index: questionIndex,
        response_text: responseText
      });
      return response;
    } catch (error: any) {
      console.error("Error evaluating voice response:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  }
}

export { restApi };