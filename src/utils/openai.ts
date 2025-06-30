import { restApi } from '../context/restApi';
import { config } from '../config/config';

export interface ChatResponse {
  question: string;
  answer: string;
  timestamp: Date;
}

export const generateInterviewResponse = async (question: string): Promise<string> => {
  try {
    const response = await restApi.postRequest('ai/chat', {
      question: question
    });

    if (response && response.data && response.data.answer) {
      return response.data.answer;
    }
    
    // Handle error response
    if (response && response.msg) {
      throw new Error(response.msg);
    }
    
    throw new Error('Failed to generate response');
  } catch (error) {
    console.error('Error calling backend AI API:', error);
    throw new Error('Failed to generate response');
  }
};

// Streaming function using backend API
export const generateInterviewResponseStream = async (
  question: string,
  onChunk: (chunk: string) => void,
  onComplete: (fullResponse: string) => void,
  onError: (error: Error) => void,
  transcribedText?: string
): Promise<void> => {
  try {
    // Use fetch to handle streaming response from backend
    // Try to get token from cookies using js-cookie (same as restApi)
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };
    
    const token = getCookie('access_token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const requestBody: any = {
      question: question
    };
    
    if (transcribedText) {
      requestBody.transcribed_text = transcribedText;
    }

    const response = await fetch(`${config.BACKEND_URL}/api/ai/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get response reader');
    }

    let fullResponse = '';
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }

      // Decode the chunk
      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            
            if (data.error) {
              onError(new Error(data.error));
              return;
            }
            
            if (data.done) {
              onComplete(fullResponse);
              return;
            }
            
            if (data.chunk) {
              fullResponse += data.chunk;
              onChunk(data.chunk);
            }
          } catch (e) {
            // Ignore parsing errors for incomplete chunks
            console.warn('Failed to parse chunk:', line);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error calling backend streaming AI API:', error);
    onError(error instanceof Error ? error : new Error('Failed to generate streaming response'));
  }
}; 