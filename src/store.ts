import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './Slices/playlistsSlice';

export interface RootState {
  playlists: ReturnType<typeof playlistsReducer>;
}

export const store = configureStore({
  reducer: {
    playlists: playlistsReducer,
  },
});
