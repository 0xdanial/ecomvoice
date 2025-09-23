export interface ProductInfo {
  content: string;
  url: string;
}

export async function fetchProductInfo(url: string): Promise<ProductInfo> {
  try {
    console.log('Fetching product info from:', url);
    
    const response = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        'X-Base': 'final'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();
    console.log('Jina API response length:', content.length);
    console.log('Jina API response preview:', content.substring(0, 500));
    
    return {
      content: content,
      url: url
    };
  } catch (error) {
    console.error('Error fetching product info:', error);
    throw error;
  }
}

