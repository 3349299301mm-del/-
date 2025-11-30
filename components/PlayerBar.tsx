import React, { useState, useEffect } from 'react';
import { Song } from '../types';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart } from 'lucide-react';

interface PlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({ currentSong, isPlaying, togglePlay, nextSong, prevSong }) => {
  const [progress, setProgress] = useState(0);

  // Simulate progress
  useEffect(() => {
    let interval: any;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextSong(); // Auto skip to next
            return 0;
          }
          return prev + (100 / currentSong.duration);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong, nextSong]);

  // Reset progress on song change
  useEffect(() => {
    setProgress(0);
  }, [currentSong?.id]);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-4 md:px-8 z-50 flex items-center justify-between">
      {/* Song Info */}
      <div className="flex items-center gap-4 w-1/4 min-w-[140px]">
        <img 
          src={currentSong.coverUrl} 
          alt={currentSong.title} 
          className="w-14 h-14 rounded-md object-cover shadow-sm hidden sm:block"
        />
        <div className="overflow-hidden">
          <h4 className="text-white font-medium truncate text-sm md:text-base">{currentSong.title}</h4>
          <p className="text-slate-400 text-xs truncate">{currentSong.artist}</p>
        </div>
        <button className="text-slate-500 hover:text-indigo-400 transition-colors ml-2">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-2/4 max-w-xl">
        <div className="flex items-center gap-6 mb-2">
          <button className="text-slate-400 hover:text-white transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
          <button 
            onClick={prevSong}
            className="text-slate-300 hover:text-white transition-colors"
          >
            <SkipBack className="w-6 h-6 fill-current" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            )}
          </button>
          <button 
            onClick={nextSong}
            className="text-slate-300 hover:text-white transition-colors"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Repeat className="w-4 h-4" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-3 text-xs text-slate-400 font-mono">
          <span>{formatTime((progress / 100) * currentSong.duration)}</span>
          <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden cursor-pointer group">
            <div 
              className="h-full bg-indigo-500 rounded-full relative group-hover:bg-indigo-400"
              style={{ width: `${progress}%` }}
            >
            </div>
          </div>
          <span>{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="w-1/4 hidden md:flex justify-end items-center gap-2">
        <Volume2 className="w-5 h-5 text-slate-400" />
        <div className="w-24 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div className="w-3/4 h-full bg-slate-400 hover:bg-indigo-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
