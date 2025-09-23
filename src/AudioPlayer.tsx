import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  text: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
  className?: string;
  showVisualizer?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  text,
  onStart,
  onEnd,
  onError,
  className = '',
  showVisualizer = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const animationRef = useRef<number | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Animation loop for visualizer
  useEffect(() => {
    if (isPlaying && showVisualizer) {
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [isPlaying, showVisualizer]);

  const speak = () => {
    if (utteranceRef.current) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      onStart?.();
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
      onEnd?.();
    };

    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
      onError?.(error);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (utteranceRef.current && isPlaying) {
      speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (utteranceRef.current && isPaused) {
      speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    utteranceRef.current = null;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      speak();
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Audio Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 rounded-full backdrop-blur-xl bg-purple-500/20 border border-purple-400/50 hover:bg-purple-500/30 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-1" />
          )}
        </button>
        
        <button
          onClick={stop}
          className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <Square className="w-4 h-4" />
        </button>
      </div>

      {/* Visualizer */}
      {showVisualizer && (
        <div className="w-full max-w-xs h-16 flex items-center justify-center space-x-1">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-100 ${
                isPlaying && Math.random() > 0.3 
                  ? 'bg-gradient-to-t from-purple-400 to-blue-400' 
                  : 'bg-white/20'
              }`}
              style={{
                height: isPlaying 
                  ? `${Math.random() * 50 + 15}px` 
                  : '15px',
                animationDelay: `${i * 50}ms`
              }}
            />
          ))}
        </div>
      )}

      {/* Text Preview */}
      <div className="text-xs text-gray-300 max-w-xs text-center line-clamp-2 bg-white/5 rounded-lg p-3 border border-white/10">
        <div className="flex items-center space-x-2 mb-1">
          <Volume2 className="w-3 h-3 text-blue-400" />
          <span className="text-blue-400 text-xs font-medium">Audio Preview</span>
        </div>
        {text}
      </div>
    </div>
  );
};
