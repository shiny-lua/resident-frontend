import axios from "axios";
import Cookies from "js-cookie";

// Helper function to convert ArrayBuffer to base64 safely
const arrayBufferToBase64 = (buffer: Uint8Array): string => {
  let binary = '';
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary);
};

axios.defaults.baseURL = (import.meta as any).env.VITE_API_BASE_URL + '/api/';
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
      const response = await restApi.postRequest('realtime-mock-interview-get-session', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error getting mock interview session:", error);
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

  // Real-time Mock Interview APIs
  startRealtimeMockInterview: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('realtime-mock-interview-start', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error starting realtime mock interview:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  getRealtimeMockInterviewStatus: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('realtime-mock-interview-get-status', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error getting realtime mock interview status:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },


  getPracticeInterviewQuestionAudio: async (sessionCode: string, questionIndex: number) => {
    try {
      const response = await restApi.postRequest('practice-interview-get-question-audio', {
        session_code: sessionCode,
        question_index: questionIndex
      });
      return response;
    } catch (error: any) {
      console.error("Error getting voice question audio:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },
  getPracticeInterviews: async (params?: {
    page?: number;
    per_page?: number;
    status?: 'active' | 'completed' | 'cancelled' | 'waiting';
    interview_type?: 'text' | 'voice';
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.status) queryParams.append('status', params.status);
      if (params?.interview_type) queryParams.append('interview_type', params.interview_type);

      const url = `get-practice-interviews${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await restApi.postRequest(url);
      return response;
    } catch (error: any) {
      console.error("Error getting practice interviews:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  createPracticeInterviewSession: async (sessionData: {
    specialty: string;
    question_count: number;
    session_name: string;
    description: string;
    resume?: string;
    scheduled_at?: string;
    timezone?: string;
  }) => {
    try {
      const response = await restApi.postRequest('practice-interview-create-session', sessionData);
      return response;
    } catch (error: any) {
      console.error("Error creating practice interview session:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  getPracticeInterviewSession: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('practice-interview-get-session', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error getting practice interview session:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  startPracticeInterviewSession: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('practice-interview-start-session', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error starting practice interview session:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  nextPracticeInterviewQuestion: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('practice-interview-next-question', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error getting next practice question:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  evaluatePracticeInterviewResponse: async (sessionCode: string, questionIndex: number, response_text: string) => {
    try {
      const responseData = await restApi.postRequest('practice-interview-evaluate-response', {
        session_code: sessionCode,
        question_index: questionIndex,
        response_text: response_text
      });
      return responseData;
    } catch (error: any) {
      console.error("Error evaluating practice response:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  endPracticeInterviewSession: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('practice-interview-end-session', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error ending practice interview session:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  leavePracticeInterview: async (sessionCode: string, action: string) => {
    try {
      const response = await restApi.postRequest('leave-practice-interview', {
        session_code: sessionCode,
        action: action
      });
      return response;
    } catch (error: any) {
      console.error("Error leaving practice interview:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  processRealtimeResponse: async (sessionCode: string, audioFile: File) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioFile);
      formData.append('session_code', sessionCode);

      const response = await restApi.postRequest('realtime-mock-interview-process-response', formData);
      return response;
    } catch (error: any) {
      console.error("Error processing realtime response:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  getRealtimeStatus: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('realtime-mock-interview-get-status', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error getting realtime status:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  endRealtimeMockInterview: async (sessionCode: string) => {
    try {
      const response = await restApi.postRequest('realtime-mock-interview-end', {
        session_code: sessionCode
      });
      return response;
    } catch (error: any) {
      console.error("Error ending realtime mock interview:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  autoProcessSilence: async (sessionCode: string, audioFile: File) => {
    try {
      // Convert audio file to base64 for JSON transmission using a proper binary-safe method
      const arrayBuffer = await audioFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Use a proper base64 encoding function for binary data
      const base64Audio = arrayBufferToBase64(uint8Array);

      const response = await restApi.postRequest('realtime-mock-interview-auto-process-silence', {
        session_code: sessionCode,
        audio_file: base64Audio
      });
      return response;
    } catch (error: any) {
      console.error("Error auto-processing silence:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  getRealtimeMockInterviewVoice: async (sessionCode: string, questionIndex: number) => {
    try {
      const response = await restApi.postRequest('realtime-mock-interview-get-voice', {
        session_code: sessionCode,
        question_index: questionIndex
      });
      return response;
    } catch (error: any) {
      console.error("Error getting realtime mock interview voice:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },

  convertSpeechToText: async (audioFile: File) => {
    try {
      // Convert audio file to base64 for JSON transmission using a proper binary-safe method
      const arrayBuffer = await audioFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Use a proper base64 encoding function for binary data
      const base64Audio = arrayBufferToBase64(uint8Array);

      const response = await restApi.postRequest('practice-interview-speech-to-text', { audio_base64: base64Audio });
      return response;
    } catch (error: any) {
      console.error("Error converting speech to text:", error);
      return error.response?.data || error.response || { data: { success: false, msg: "Network error" } };
    }
  },
}

export { restApi };