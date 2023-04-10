import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Song {
  title: string;
  artist: string;
  genre: string;
  year: number;
  duration: number;
  popularity: number;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  color: string;
}

export interface Top50Playlist extends Playlist {
  year: number;
}

interface PlaylistsState {
  playlists: Playlist[];
  top50Playlists: Top50Playlist[];
  selectedSong: Song | null;
}

const initialState: PlaylistsState = {
  playlists: [],
  top50Playlists: [],
  selectedSong: null,
};

const likedSongsPlaylist = initialState.playlists.find((playlist) => playlist.id === 'likedSongs');
if (!likedSongsPlaylist) {
  const newLikedSongsPlaylist: Playlist = {
    id: 'likedSongs',
    name: 'Liked Songs',
    songs: [],
    color: 'linear-gradient(to bottom, purple, white)'
  };
  initialState.playlists.push(newLikedSongsPlaylist);
}

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setTop50Playlists: (state, action: PayloadAction<Top50Playlist[]>) => {
      state.top50Playlists = action.payload;
    },
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists.push(action.payload);
    },
    addLikedSongs: (state, action: PayloadAction<Song>) => {
      const likedSongsPlaylist = state.playlists.find((playlist) => playlist.id === 'likedSongs');

      if (likedSongsPlaylist) {
        const existingSong = likedSongsPlaylist.songs.findIndex((song) =>
          song.title === action.payload.title && song.artist === action.payload.artist && song.genre === action.payload.genre
        );
        if (existingSong !== -1) {
          likedSongsPlaylist.songs = likedSongsPlaylist.songs.filter((_, index) => index !== existingSong);
        } else {
          likedSongsPlaylist.songs.push(action.payload);
        }
      }
    },
    updateSelectedSong: (state, action: PayloadAction<Song | null>) => {
      state.selectedSong = action.payload;
    },
  },
});

export const { setTop50Playlists, addPlaylist, addLikedSongs, updateSelectedSong } = playlistsSlice.actions;

export default playlistsSlice.reducer;
