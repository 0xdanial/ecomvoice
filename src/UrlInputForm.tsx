import React, { useState } from 'react';
import { Link, Bot, Loader2 } from 'lucide-react';

interface UrlInputFormProps {
  onUrlSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ 
  onUrlSubmit, 
  isLoading, 
  error 
}) => {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (inputUrl: string): boolean => {
    try {
      new URL(inputUrl);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setIsValidUrl(false);
      return;
    }

    const isValid = validateUrl(url);
    setIsValidUrl(isValid);
    
    if (isValid) {
      onUrlSubmit(url.trim());
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // Clear validation error when user starts typing
    if (!isValidUrl && newUrl.trim()) {
      setIsValidUrl(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow Enter key to submit form
    if (e.key === 'Enter' && !isLoading && url.trim()) {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">AI Voice Over</h1>
        <p className="text-gray-300 text-lg">
          Paste any product page URL and let our AI explain everything about it in detail
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4" role="form" aria-label="Product URL input form">
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="product-url"
              type="url"
              value={url}
              onChange={handleUrlChange}
              onKeyDown={handleKeyDown}
              placeholder="https://example-store.com/product-page"
              className={`
                w-full pl-12 pr-4 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-400
                focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20
                transition-all duration-300
                ${!isValidUrl ? 'border-red-500 bg-red-500/10' : 'border-white/20'}
              `}
              disabled={isLoading}
              aria-describedby={!isValidUrl ? 'url-error' : 'url-help'}
              aria-invalid={!isValidUrl}
              aria-required="true"
              autoComplete="url"
              autoFocus
            />
            {!isValidUrl && (
              <p id="url-error" className="mt-2 text-sm text-red-400" role="alert">
                Please enter a valid URL (e.g., https://example.com)
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-w-[140px]"
            aria-describedby="button-help"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Thinking...</span>
              </>
            ) : (
              <>
                <Bot className="w-5 h-5" />
                <span>Explain</span>
              </>
            )}
          </button>
        </div>
        <p id="button-help" className="text-sm text-gray-400 text-center">
          {isLoading ? 'Please wait while I load the product information...' : 'Click to begin voice shopping assistance'}
        </p>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-lg">
          <p className="text-red-300 text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {/* Demo Section */}
      {!url && !isLoading && (
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Try a Example URL</h3>
          <p className="text-gray-300 mb-6">
            Don't have a product URL handy? Try one of these examples:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setUrl('https://www.nike.com/t/vomero-premium-road-running-shoes-6y7UClAy/IQ4035-100')}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
            >
              Nike Vomero Premium
            </button>
            <button
              onClick={() => setUrl('https://originusa.com/products/100-cotton-jean?variant=50241059193110')}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
            >
              HERITAGE COTTON JEANS
            </button>
            <button
              onClick={() => setUrl('https://club21.com/products/comme-des-garcons-play-bob-logo-tee-unisex-tees-300040467blk?variant=50673095573793&country=SG&currency=SGD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoqt0pP1lHrP1CuH1r5pd7z0E-ub0xSkfNgQPHbqTdx6OM-nKfN4hbA')}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
            >
              COMME des GARCONS PLAY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
