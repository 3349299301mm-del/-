import React, { useState } from 'react';
import { ViewState, Song } from './types';
import { Sidebar } from './components/Sidebar';
import { PlayerBar } from './components/PlayerBar';
import { AIDJ } from './components/AIDJ';
import { SongCard } from './components/SongCard';
import { Menu } from 'lucide-react';

// Mock Data for Home
const TRENDING_SONGS: Song[] = [
  { id: '1', title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: 243, coverUrl: 'https://picsum.photos/seed/m83/300/300', genre: 'Synth-pop' },
  { id: '2', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: 200, coverUrl: 'https://picsum.photos/seed/weeknd/300/300', genre: 'Pop' },
  { id: '3', title: 'Heat Waves', artist: 'Glass Animals', album: 'Dreamland', duration: 238, coverUrl: 'https://picsum.photos/seed/glass/300/300', genre: 'Indie' },
  { id: '4', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 203, coverUrl: 'https://picsum.photos/seed/dua/300/300', genre: 'Pop' },
  { id: '5', title: 'Stay', artist: 'Kid LAROI & Justin Bieber', album: 'F*ck Love 3', duration: 141, coverUrl: 'https://picsum.photos/seed/kid/300/300', genre: 'Pop' },
];

const RECENTLY_PLAYED: Song[] = [
  { id: '6', title: 'Dreams', artist: 'Fleetwood Mac', album: 'Rumours', duration: 257, coverUrl: 'https://picsum.photos/seed/fleetwood/300/300', genre: 'Rock' },
  { id: '7', title: 'As It Was', artist: 'Harry Styles', album: 'Harry\'s House', duration: 167, coverUrl: 'https://picsum.photos/seed/harry/300/300', genre: 'Pop' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Player Logic
  const playSong = (song: Song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    // Simple mock next logic - in a real app this would use a playlist queue
    if (currentSong) {
      const allSongs = [...TRENDING_SONGS, ...RECENTLY_PLAYED];
      const idx = allSongs.findIndex(s => s.id === currentSong.id);
      if (idx !== -1 && idx < allSongs.length - 1) {
        playSong(allSongs[idx + 1]);
      } else {
        // Loop back to start or handle end of queue
        playSong(allSongs[0]);
      }
    }
  };

  const prevSong = () => {
    if (currentSong) {
      const allSongs = [...TRENDING_SONGS, ...RECENTLY_PLAYED];
      const idx = allSongs.findIndex(s => s.id === currentSong.id);
      if (idx > 0) {
        playSong(allSongs[idx - 1]);
      }
    }
  };

  // Render Content based on View
  const renderContent = () => {
    switch (currentView) {
      case 'AI_MOOD':
        return <AIDJ playSong={playSong} currentSong={currentSong} isPlaying={isPlaying} />;
      case 'SEARCH':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
            <h2 className="text-2xl font-bold mb-2">Search Library</h2>
            <p>Start typing to search for artists, songs, or podcasts.</p>
          </div>
        );
      case 'LIBRARY':
        return (
          <div className="pb-24">
             <h2 className="text-2xl font-bold text-white mb-6">Your Library</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {RECENTLY_PLAYED.map(song => (
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
        );
      case 'HOME':
      default:
        return (
          <div className="pb-24 space-y-10">
            {/* Hero Section */}
            <section className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-800 to-indigo-900 flex items-center px-8 md:px-12">
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-wider text-indigo-300 uppercase mb-2 block">Featured Playlist</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Deep Focus Mix</h1>
                <p className="text-indigo-200 mb-6 max-w-lg">Get in the zone with these ambient tracks tailored for productivity and deep work sessions.</p>
                <button 
                  onClick={() => playSong(TRENDING_SONGS[0])}
                  className="px-8 py-3 bg-white text-indigo-900 rounded-full font-bold hover:bg-indigo-50 transition-colors"
                >
                  Play Now
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://picsum.photos/seed/music/800/400')] bg-cover opacity-20 mix-blend-overlay"></div>
            </section>

            {/* Trending */}
            <section>
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-bold text-white">Trending Now</h2>
                 <button className="text-sm text-slate-400 hover:text-white">See All</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {TRENDING_SONGS.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isActive={currentSong?.id === song.id}
                    isPlaying={isPlaying}
                    onClick={() => playSong(song)}
                  />
                ))}
              </div>
            </section>

            {/* Recently Played */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Recently Played</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {RECENTLY_PLAYED.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isActive={currentSong?.id === song.id}
                    isPlaying={isPlaying}
                    onClick={() => playSong(song)}
                  />
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-50 overflow-hidden">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-slate-800 rounded-lg text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isMobileMenuOpen={isMobileMenuOpen}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative w-full">
        {/* Top Gradient/Header Background */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-900/20 to-slate-900 -z-10"></div>
        
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
          {renderContent()}
        </div>
      </main>

      {/* Persistent Player */}
      <PlayerBar 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        togglePlay={togglePlay}
        nextSong={nextSong}
        prevSong={prevSong}
      />
    </div>
  );
};

export default App;
