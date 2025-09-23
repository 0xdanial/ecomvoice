import { useNavigate } from 'react-router-dom';
import { Bot, ShoppingCart, Eye, Volume2, MessageSquare, Zap, Shield, Heart } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xl font-bold">EcomVoice</span>
              </div>
              <div className="hidden md:flex space-x-4">
                <button 
                  onClick={() => navigate('/product-analyzer')}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  Try Now
                </button>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  Features
                </button>
                <button 
                  onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-6 py-3">
                <span className="text-blue-300 text-sm font-medium">🚀 Revolutionizing E-commerce Accessibility</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Accessible Shopping for People with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> Vision Difficulties </span>
              and Elderly
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform e-commerce accessibility with our AI-powered voice over. 
              We help visually impaired users navigate online stores, understand product details, 
              and make confident purchases through intelligent conversation.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => navigate('/product-analyzer')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-3 min-w-[200px]"
              >
                <Bot className="w-6 h-6" />
                <span>Test With Custom URL</span>
              </button>
              
              <button className="group px-8 py-4 backdrop-blur-xl bg-white/10 border-2 border-blue-400/50 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-blue-400 flex items-center space-x-3 min-w-[200px]">
                <ShoppingCart className="w-6 h-6" />
                <span>Test in Store</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">285M</div>
                <div className="text-gray-300">Visually Impaired Globally</div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">90%</div>
                <div className="text-gray-300">Improved Conversion Rate</div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                <div className="text-gray-300">Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Widget Showcase Section */}
      <section className="relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">The Widget That Changes Everything</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A simple, powerful widget that transforms any e-commerce site into an accessible shopping experience. 
              Just one line of code and your products become discoverable through AI-powered voice interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 items-center">
            {/* Widget Demo */}
            <div className="space-y-8">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Live Widget Preview</h3>
                
                {/* Curved Arrow pointing to button - positioned outside the widget */}
                <div className="absolute right-40 top-1/2 transform -translate-y-1/2 w-64 h-64 pointer-events-none z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" className="w-full h-full">
                    {/* Main arrow curve */}
                    <path d="M150 50
                             C100 200, 300 200, 220 280
                             C160 340, 260 400, 380 460
                             C440 490, 500 510, 560 540"
                          stroke="white"
                          strokeWidth="20"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          markerEnd="url(#arrowhead)" />
                    
                    {/* Smaller arrowhead */}
                    <defs>
                      <marker id="arrowhead" markerWidth="8" markerHeight="8" 
                              refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L7,3.5 L0,7 Z" fill="white" />
                      </marker>
                    </defs>
                  </svg>
                </div>

                {/* Mock Website Header */}
                <div className="bg-gray-900 rounded-2xl p-6 mb-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white rounded-lg"></div>
                      <span className="text-white font-semibold">Your Store</span>
                    </div>
                  </div>
                  
                  {/* Product Card Example with Overlay */}
                  <div className="relative">
                    <div className="bg-gray-900 rounded-xl p-4 mb-4">
                      <div className="flex space-x-4">
                        <div className="w-20 h-20 bg-gray-600 rounded-lg"></div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">Green Shirt</h4>
                          <p className="text-gray-300 text-sm mb-2">$29.99</p>
                          <p className="text-gray-400 text-xs">Noise-canceling, 30hr battery</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Low Opacity Black Overlay */}
                    <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
                  </div>
                  
                  {/* The Widget Button - Enhanced Visibility */}
                  <div className="flex justify-end relative z-10">
                    <button className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl text-white font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2 border border-purple-400/30 shadow-2xl">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                      </svg>
                      <span>AI Voice Over</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration Info */}
            <div className="space-y-8">
              

          
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Revolutionary Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Empowering blind and elderly users with cutting-edge AI technology for seamless e-commerce experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Intelligent Voice-Over</h3>
              <p className="text-gray-300 leading-relaxed">
                Our AI describes products, store layouts, and navigation paths in natural, conversational language tailored for blind users.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Interactive Q&A</h3>
              <p className="text-gray-300 leading-relaxed">
                Users can ask questions about products, sizes, colors, materials, and get instant, detailed AI-powered responses.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Real-time Analysis</h3>
              <p className="text-gray-300 leading-relaxed">
                Instantly analyze any product page, extract key information, and provide comprehensive audio descriptions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Privacy First</h3>
              <p className="text-gray-300 leading-relaxed">
                Secure, encrypted conversations with no personal data storage. Your privacy and shopping habits remain protected.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Accessibility Focus</h3>
              <p className="text-gray-300 leading-relaxed">
                Designed specifically for blind and elderly users, ensuring everyone can shop online with confidence and independence.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Conversion Optimization</h3>
              <p className="text-gray-300 leading-relaxed">
                Increase e-commerce conversion rates by making your store accessible to millions of potential customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform E-commerce?</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join the revolution in accessibility technology. Help millions of visually impaired users 
              discover and purchase your products with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/product-analyzer')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                Try Now - It's Free
              </button>
              <button className="px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-white/20">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-lg font-bold">EcomVoice</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 EcomVoice. Making e-commerce accessible for everyone.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
