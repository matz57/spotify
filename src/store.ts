import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './Slices/playlistsSlice';

export interface State {

}

export default configureStore({
    reducer: {
        playlists: playlistsReducer,
    },
});
