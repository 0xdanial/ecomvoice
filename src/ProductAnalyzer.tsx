import { useState } from 'react'
import { useVoiceAssistant } from './VoiceAssistantWidget'
import { UrlInputForm } from './UrlInputForm'
import { Eye, Bot, Volume2, ArrowLeft, Mic, MicOff, Pause, Loader2 } from 'lucide-react'

function ProductAnalyzer() {
  const [productUrl, setProductUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showWidget, setShowWidget] = useState(false)

  // Use voice assistant hook - no API key needed as it's handled server-side
  // Key prop forces re-initialization when productUrl changes
  const voiceAssistant = useVoiceAssistant({
    productUrl: showWidget ? productUrl : undefined
  })

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true)
    setError(null)
    
    // Reset voice assistant if changing products
    if (showWidget && productUrl !== url) {
      voiceAssistant.resetVoiceAssistant()
    }
    
    setProductUrl(url)
    setShowWidget(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-white">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-lg font-bold">EcomVoice</span>
              </div>
              {showWidget && (
                <button
                  onClick={() => {
                    voiceAssistant.resetVoiceAssistant()
                    setShowWidget(false)
                  }}
                  className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Change Product</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {!showWidget ? (
            <UrlInputForm 
              onUrlSubmit={handleUrlSubmit}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {/* Product Info Panel */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                    <Bot className="w-6 h-6" />
                    <span>Current Product</span>
                  </h2>
                </div>
                
                <div className="text-gray-300 leading-relaxed">
                  <p className="break-all text-sm bg-white/5 rounded-lg p-3 border border-white/10">
                    <strong className="text-white">URL:</strong> {productUrl}
                  </p>
                </div>

                {/* Voice Assistant Controls */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Volume2 className="w-5 h-5" />
                    <span>Voice Over</span>
                  </h3>
                  
                  <div className="flex flex-col space-y-4">
                    {/* Voice Control Button */}
                    <button
                      onClick={voiceAssistant.toggleVoiceAssistant}
                      disabled={voiceAssistant.isLoading}
                      className={`
                        w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3
                        backdrop-blur-xl border-2
                        ${voiceAssistant.isListening 
                          ? 'bg-red-500/20 border-red-400/50 hover:bg-red-500/30 animate-pulse' 
                          : voiceAssistant.isSpeaking 
                          ? 'bg-blue-500/20 border-blue-400/50 hover:bg-blue-500/30 animate-pulse'
                          : 'bg-purple-500/20 border-purple-400/50 hover:bg-purple-500/30 hover:scale-105'
                        }
                        ${voiceAssistant.isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      {voiceAssistant.isLoading ? (
                        <>
                          <Loader2 className="w-6 h-6 text-white animate-spin" />
                          <span className="text-white">Processing...</span>
                        </>
                      ) : voiceAssistant.isListening ? (
                        <>
                          <MicOff className="w-6 h-6 text-white" />
                          <span className="text-white">Stop Listening</span>
                        </>
                      ) : voiceAssistant.isSpeaking ? (
                        <>
                          <Pause className="w-6 h-6 text-white" />
                          <span className="text-white">Stop Speaking</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-6 h-6 text-white" />
                          <span className="text-white">Start Voice Assistant</span>
                        </>
                      )}
                    </button>

                    {/* Status Messages */}
                    {voiceAssistant.error && (
                      <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
                        <p className="text-red-300 text-sm">
                          <strong>Error:</strong> {voiceAssistant.error}
                        </p>
                      </div>
                    )}

                    {voiceAssistant.isListening && (
                      <div className="p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                        <p className="text-blue-300 text-sm">
                          🎤 Listening for your voice input...
                        </p>
                      </div>
                    )}

                    {voiceAssistant.isSpeaking && (
                      <div className="p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
                        <p className="text-green-300 text-sm">
                          🔊 Speaking product information...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

      
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default ProductAnalyzer
