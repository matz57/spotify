import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import './PlaylistDetailPage.css';

const PlaylistDetailPage = () => {
  const { year } = useParams<{ year?: string }>();
  const { playlists } = useSelector((state: RootState) => state.playlists);
  const currentPlaylist = playlists.find((playlist) => playlist.year === parseInt(year || "", 10));

  if (!currentPlaylist) {
    return <div>Playlist not found</div>;
  }

  return (
    <div className="song-list">
      <h2>{`Top 50 - ${year}`}</h2>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {currentPlaylist.songs.map((song, index) => (
            <tr key={`${song.title}-${song.artist}`}>
              <td>{index + 1}</td>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
              <td>{song.year}</td>
              <td>{song.duration}</td>
              <td>{song.popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistDetailPage;
