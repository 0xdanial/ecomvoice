export interface SensayResponse {
  success: boolean;
  content: string;
}

export interface SensayChatHistory {
  success: boolean;
  type: string;
  items: Array<{
    content: string;
    created_at: string;
    id: number;
    is_private: boolean;
    role: string;
    source: string;
    user_uuid: string;
    original_message_id: string;
  }>;
}

export async function callSensayAPI(
  content: string, 
  productUrl?: string,
  skipChatHistory: boolean = false
): Promise<string> {
  try {
    // Validate content
    if (!content || content.trim() === '') {
      throw new Error('Content is required for the API call.');
    }
    
    const requestBody = {
      content: content,
      skip_chat_history: skipChatHistory,
      productUrl: productUrl
    };
    
    console.log('Sensay API Request:', {
      url: '/api/sensay/chat',
      hasProductUrl: !!productUrl,
      skipChatHistory: skipChatHistory,
      content: content,
      requestBody: requestBody
    });
    
    const response = await fetch('/api/sensay/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Sensay API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData.error,
        details: errorData.details,
        fullError: errorData
      });
      throw new Error(`API error: ${errorData.error || response.statusText}${errorData.details ? ` - ${errorData.details}` : ''}`);
    }

    const data: SensayResponse = await response.json();
    
    console.log('Sensay API Response received');
    
    if (data.success && data.content) {
      return data.content;
    } else {
      throw new Error(`API returned error: ${data.content || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error calling Sensay API:', error);
    throw error;
  }
}

export async function getSensayChatHistory(): Promise<SensayChatHistory> {
  try {
    console.log('Fetching Sensay chat history from secure API');
    
    const response = await fetch('/api/sensay/history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Chat History API error: ${errorData.error || response.statusText}`);
    }

    const data: SensayChatHistory = await response.json();
    console.log('Sensay Chat History received');
    return data;
  } catch (error) {
    console.error('Error fetching Sensay chat history:', error);
    throw error;
  }
}
