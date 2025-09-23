import type { VercelRequest, VercelResponse } from '@vercel/node';

interface SensayChatHistory {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API credentials from environment variables (server-side only)
    const apiKey = process.env.SENSAY_API_KEY;
    const replicaId = process.env.SENSAY_REPLICA_ID;
    const userId = process.env.SENSAY_USER_ID;

    // Validate required environment variables
    if (!apiKey || !replicaId) {
      console.error('Missing required environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error. Please contact support.' 
      });
    }

    console.log('Fetching Sensay chat history:', {
      replicaId: replicaId,
      apiKeyLength: apiKey ? apiKey.length : 0,
      userIdLength: userId ? userId.length : 0
    });

    // Make the API call to Sensay
    const response = await fetch(`https://api.sensay.io/v1/replicas/${replicaId}/chat/history`, {
      method: 'GET',
      headers: {
        'X-ORGANIZATION-SECRET': apiKey,
        'X-USER-ID': userId || '',
        'X-API-Version': '2025-03-25'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Sensay Chat History API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      return res.status(response.status).json({ 
        error: `Failed to fetch chat history: ${response.statusText}` 
      });
    }

    const data: SensayChatHistory = await response.json();
    console.log('Sensay Chat History received');

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in Sensay chat history handler:', error);
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}
