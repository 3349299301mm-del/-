import React from 'react';
import { Song } from '../types';
import { Play, Pause, BarChart3 } from 'lucide-react';

interface SongCardProps {
  song: Song;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

export const SongCard: React.FC<SongCardProps> = ({ song, isActive, isPlaying, onClick }) => {
  return (
    <div 
      className={`group relative p-4 rounded-xl transition-all duration-300 hover:bg-white/10 cursor-pointer ${isActive ? 'bg-white/10' : 'bg-white/5'}`}
      onClick={onClick}
    >
      <div className="relative aspect-square mb-4 rounded-md overflow-hidden shadow-lg">
        <img 
          src={song.coverUrl} 
          alt={song.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Hover Overlay / Active State */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-105">
            {isActive && isPlaying ? (
               <Pause className="w-6 h-6 text-white fill-current" />
            ) : (
               <Play className="w-6 h-6 text-white fill-current translate-x-0.5" />
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className={`font-semibold truncate ${isActive ? 'text-indigo-400' : 'text-white'}`}>
          {song.title}
        </h3>
        <p className="text-sm text-slate-400 truncate">{song.artist}</p>
        {song.mood && (
          <p className="text-xs text-indigo-300 mt-1 line-clamp-1 italic opacity-80">
            {song.mood}
          </p>
        )}
      </div>
    </div>
  );
};
