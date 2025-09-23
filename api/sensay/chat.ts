import type { VercelRequest, VercelResponse } from '@vercel/node';

interface SensayResponse {
  success: boolean;
  content: string;
}

interface SensayRequest {
  content: string;
  skip_chat_history?: boolean;
  productUrl?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API credentials from environment variables (server-side only)
    const apiKey = process.env.SENSAY_API_KEY;
    const replicaId = process.env.SENSAY_REPLICA_ID;
    const userId = process.env.SENSAY_USER_ID;

    // Validate required environment variables
    if (!apiKey || !replicaId) {
      console.error('Missing required environment variables:', {
        hasApiKey: !!apiKey,
        hasReplicaId: !!replicaId,
        apiKeyLength: apiKey ? apiKey.length : 0,
        replicaIdLength: replicaId ? replicaId.length : 0
      });
      return res.status(500).json({ 
        error: 'Server configuration error. Please contact support.' 
      });
    }

    const { content, skip_chat_history = false, productUrl }: SensayRequest = req.body;

    // Validate request body
    if (!content || typeof content !== 'string') {
      console.error('Invalid request body:', {
        content: content,
        contentType: typeof content,
        body: req.body
      });
      return res.status(400).json({ 
        error: 'Content is required and must be a string' 
      });
    }

    // Prepare the request body for Sensay API
    const requestBody = {
      content: content,
      skip_chat_history: skip_chat_history,
      source: 'discord',
      discord_data: {
        channel_id: 'voice-assistant-widget',
        channel_name: 'Voice Assistant',
        author_id: userId || 'user-123',
        author_name: 'User',
        message_id: `msg-${Date.now()}`,
        created_at: new Date().toISOString(),
        server_id: 'shopify-store',
        server_name: 'Shopify Store'
      }
    };

    // Add product URL context if provided
    if (productUrl) {
      requestBody.content = `Product URL: ${productUrl}\n\nUser Question: ${content}`;
    }

    console.log('Sensay API Request:', {
      url: `https://api.sensay.io/v1/replicas/${replicaId}/chat/completions`,
      replicaId: replicaId,
      apiKeyLength: apiKey ? apiKey.length : 0,
      userIdLength: userId ? userId.length : 0,
      hasProductUrl: !!productUrl,
      requestBody: requestBody
    });

    // Make the API call to Sensay
    const response = await fetch(`https://api.sensay.io/v1/replicas/${replicaId}/chat/completions`, {
      method: 'POST',
      headers: {
        'X-ORGANIZATION-SECRET': apiKey,
        'X-USER-ID': userId || '',
        'Content-Type': 'application/json',
        'X-API-Version': '2025-03-25'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Sensay API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText,
        requestUrl: `https://api.sensay.io/v1/replicas/${replicaId}/chat/completions`,
        requestBody: requestBody
      });
      return res.status(response.status).json({ 
        error: `API request failed: ${response.statusText}`,
        details: errorText
      });
    }

    const data: SensayResponse = await response.json();
    
    console.log('Sensay API Response received');

    if (data.success && data.content) {
      return res.status(200).json({
        success: true,
        content: data.content
      });
    } else {
      return res.status(400).json({
        success: false,
        error: data.content || 'Unknown error from Sensay API'
      });
    }
  } catch (error) {
    console.error('Error in Sensay API handler:', error);
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}
