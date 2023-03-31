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
  year: number;
  songs: Song[];
  color: string;
}

interface PlaylistsState {
  playlists: Playlist[];
}

const initialState: PlaylistsState = {
  playlists: [],
};

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
    },
  },
});

export const { setPlaylists } = playlistsSlice.actions;

export default playlistsSlice.reducer;
