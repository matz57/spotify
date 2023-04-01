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
}

const initialState: PlaylistsState = {
  playlists: [],
  top50Playlists: [],
};

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
  },
});

export const { setTop50Playlists, addPlaylist } = playlistsSlice.actions;

export default playlistsSlice.reducer;
