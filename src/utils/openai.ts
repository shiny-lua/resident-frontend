import { OpenAI } from 'openai-streams';

const OPENAI_API_KEY = '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';

export interface ChatResponse {
  question: string;
  answer: string;
  timestamp: Date;
}

export const generateInterviewResponse = async (question: string): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant helping with interview preparation. Provide concise, professional answers to interview questions. Keep responses under 200 words and focus on practical examples and skills. I am daniel from colombia. I have 8 years of experiecne in software development like, react, vue, python, node and so on.'
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to generate response');
  }
};

// Streaming function using openai-streams package
export const generateInterviewResponseStream = async (
  question: string,
  onChunk: (chunk: string) => void,
  onComplete: (fullResponse: string) => void,
  onError: (error: Error) => void
): Promise<void> => {
  try {
    const stream = await OpenAI(
      'chat',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant helping with interview preparation. Provide concise, professional answers to interview questions. Keep responses under 200 words and focus on practical examples and skills. I am daniel from colombia. I have 8 years of experiecne in software development like, react, vue, python, node and so on.'
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      },
      { 
        apiKey: OPENAI_API_KEY,
        mode: 'tokens' // Get just the text chunks, not full events
      }
    );

    const reader = stream.getReader();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        onComplete(fullResponse);
        break;
      }

      // Decode the chunk (value is Uint8Array)
      const chunk = new TextDecoder().decode(value);
      fullResponse += chunk;
      onChunk(chunk);
    }
  } catch (error) {
    console.error('Error calling OpenAI streaming API:', error);
    onError(error instanceof Error ? error : new Error('Failed to generate streaming response'));
  }
}; 