export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  genre?: string;
  mood?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  coverUrl: string;
}

export type ViewState = 'HOME' | 'SEARCH' | 'LIBRARY' | 'AI_MOOD';

export interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
}
