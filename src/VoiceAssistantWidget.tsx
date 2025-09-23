import { useState, useEffect, useRef } from 'react';
import { fetchProductInfo, type ProductInfo } from './fetchProductInfo';
import { callSensayAPI, getSensayChatHistory } from './aiWrapper';
import { ttsService } from './ttsService';

interface UseVoiceAssistantProps {
  productUrl?: string;
}

export const useVoiceAssistant = ({ 
  productUrl 
}: UseVoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleUserInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setError('Speech recognition failed. Please try again.');
      };
    }

    // Set up TTS service event handlers
    ttsService.onStart = () => setIsSpeaking(true);
    ttsService.onEnd = () => setIsSpeaking(false);
    ttsService.onError = (error) => {
      console.error('TTS Error:', error);
      setIsSpeaking(false);
      setError('Speech synthesis failed');
    };

    return () => {
      ttsService.stop();
    };
  }, []);

  // Reset conversation state when product URL changes
  useEffect(() => {
    if (productUrl) {
      // Reset all conversation state when product URL changes
      setConversationHistory([]);
      setProductInfo(null);
      setError(null);
      setIsLoading(false);
      setIsListening(false);
      setIsSpeaking(false);
      ttsService.stop();
    }
  }, [productUrl]);

  const loadChatHistory = async () => {
    try {
      const history = await getSensayChatHistory();
      console.log('Loaded chat history from Sensay:', history);
      
      if (history.success && history.items && history.items.length > 0) {
        // Convert Sensay chat history to our conversation format
        const conversation = history.items.map(item => item.content);
        setConversationHistory(conversation);
        console.log('Set conversation history:', conversation);
      }
    } catch (err) {
      console.error('Error loading chat history:', err);
    }
  };

  const loadProductInfo = async () => {
    if (!productUrl) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // First load existing chat history
      await loadChatHistory();
      
      const info = await fetchProductInfo(productUrl);
      setProductInfo(info);
      
      console.log('Scraped Product Info:', info);
      
      // Generate initial AI response about the product
      const productDescription = `You are a helpful voice assistant for an e-commerce store. Here is the scraped content from a product page that you need to help customers with:

PRODUCT PAGE CONTENT:
${info.content}

Please provide a friendly, helpful introduction about this product that I can speak to customers. Focus on the key features, benefits, and why they might want to buy it. Keep it conversational and engaging, as if you're talking directly to a potential customer.`;
      
      console.log('Sending to AI:', productDescription);
      
      const aiResponse = await callSensayAPI(productDescription, productUrl, false);
      setConversationHistory(prev => [...prev, aiResponse]);
      
      // Speak the initial response
      await ttsService.speak(aiResponse);
    } catch (err) {
      setError('Failed to load product information');
      console.error('Error loading product info:', err);
    } finally {
      setIsLoading(false);
    }
  };


  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setError(null);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleUserInput = async (userInput: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('User input:', userInput);
      console.log('Current conversation history:', conversationHistory);
      
      // Add user input to conversation history
      const newHistory = [...conversationHistory, userInput];
      setConversationHistory(newHistory);

      // Get AI response - let Sensay handle the conversation context
      const context = productInfo ? 
        `You are a helpful voice assistant for an e-commerce store. Here is the scraped content from a product page that you need to help customers with:

PRODUCT PAGE CONTENT:
${productInfo.content}

The user just asked: ${userInput}

Please respond to the customer's question or request in a helpful, friendly manner. You can answer questions about the product, provide recommendations, or help with any other e-commerce related queries.` : 
        `You are a helpful voice assistant. Please respond to the user's question: ${userInput}`;
      
      console.log('Sending context to AI:', context);
      const aiResponse = await callSensayAPI(context, productUrl, false);
      
      // Add AI response to conversation history
      setConversationHistory([...newHistory, aiResponse]);
      
      // Speak the response
      await ttsService.speak(aiResponse);
    } catch (err) {
      setError('Failed to get AI response');
      console.error('Error getting AI response:', err);
    } finally {
      setIsLoading(false);
    }
  };


  const toggleVoiceAssistant = async () => {
    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
    } else if (isListening) {
      stopListening();
    } else {
      // If no conversation yet and no product info loaded, load product info first
      if (conversationHistory.length === 0 && !productInfo && productUrl) {
        await loadProductInfo();
      } else {
        // Continue conversation - start listening
        startListening();
      }
    }
  };

  // Reset function to clear all state
  const resetVoiceAssistant = () => {
    setConversationHistory([]);
    setProductInfo(null);
    setError(null);
    setIsLoading(false);
    setIsListening(false);
    setIsSpeaking(false);
    ttsService.stop();
  };

  // Return voice control state and functions for integration into main UI
  return {
    isListening,
    isSpeaking,
    isLoading,
    error,
    productInfo,
    conversationHistory,
    toggleVoiceAssistant,
    startListening,
    stopListening,
    resetVoiceAssistant
  };
};

// Global types for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
