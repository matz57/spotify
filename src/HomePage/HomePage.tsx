import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setPlaylists, Playlist } from '../Slices/playlistsSlice';
import { Link } from 'react-router-dom';
import './HomePage.css';
import data from '../static/data.json';

const HomePage = () => {
  const dispatch = useDispatch();
  const { playlists } = useSelector((state: RootState) => state.playlists);


  useEffect(() => {
    const playlistsData: Playlist[] = [];
    // Boucle sur les années pour créer les playlists
    for (let year = new Date().getFullYear(); year >= 1950; year--) {
      const playlist: Playlist = { year, songs: [] };
      data.forEach((song: any) => {
        if (song.year === year) {
          playlist.songs.push(song);
        }
      });
      if (playlist.songs.length > 0) {
        playlistsData.push(playlist);
      }
    }
    dispatch(setPlaylists(playlistsData)); // ajouter les playlists créées au state
  }, [dispatch]);
  

  // génération d'une couleur aléatoire pour chaque card
  const getRandomColor = (): string => {
    const colors = [
      'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)',
      'linear-gradient(135deg, #F08080 0%, #FFB6C1 100%)',
      'linear-gradient(135deg, #FFC0CB 0%, #FF69B4 100%)',
      'linear-gradient(135deg, #FFA07A 0%, #FF8C00 100%)',
      'linear-gradient(135deg, #FFFF00 0%, #32CD32 100%)',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="playlist-cards">
      {playlists.map((playlist) => (
        <Link
          key={playlist.year}
          to={`/playlist/${playlist.year}`}
          style={{ background: getRandomColor() }}
        >
          <div className="playlist-card">
            <h2>{`Top 50 - ${playlist.year}`}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
