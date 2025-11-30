import React, { useState } from 'react';
import { getMoodPlaylist } from '../services/geminiService';
import { Song } from '../types';
import { SongCard } from './SongCard';
import { Sparkles, Loader2, Send } from 'lucide-react';

interface AIDJProps {
  playSong: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

export const AIDJ: React.FC<AIDJProps> = ({ playSong, currentSong, isPlaying }) => {
  const [mood, setMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSongs, setGeneratedSongs] = useState<Song[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    const songs = await getMoodPlaylist(mood);
    setGeneratedSongs(songs);
    setIsLoading(false);
  };

  const suggestions = [
    "Late night coding 💻",
    "Running in the rain 🏃‍♂️",
    "Cooking a romantic dinner 🍝",
    "Road trip through the desert 🌵"
  ];

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl p-8 mb-10 border border-indigo-500/20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">AI Mood DJ</h2>
          </div>
          <p className="text-indigo-200 mb-8 text-lg">
            Describe your current vibe, activity, or feeling, and I'll curate the perfect soundtrack using Gemini AI.
          </p>

          <form onSubmit={handleGenerate} className="relative">
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="How are you feeling right now?"
              className="w-full bg-slate-900/80 border border-slate-700 text-white text-lg rounded-xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
            />
            <button 
              type="button" 
              onClick={handleGenerate}
              disabled={isLoading || !mood}
              className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-lg px-4 flex items-center justify-center transition-colors"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setMood(s)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-slate-300 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
          <p className="text-slate-400 animate-pulse">Consulting the sonic oracles...</p>
        </div>
      ) : generatedSongs.length > 0 ? (
        <div className="animate-fade-in">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
            Curated for "{mood}"
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {generatedSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isActive={currentSong?.id === song.id}
                isPlaying={isPlaying}
                onClick={() => playSong(song)}
              />
            ))}
          </div>
        </div>
      ) : hasSearched && !isLoading ? (
        <div className="text-center py-20 text-slate-500">
          <p>No tunes found. Try a different mood?</p>
        </div>
      ) : null}
    </div>
  );
};
