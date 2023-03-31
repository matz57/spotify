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

  const getRandomColor = (): string => {
    const color1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    const color2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
  };

  useEffect(() => {
    const playlistsData: Playlist[] = [];
    // créer les playlists
    for (let year = new Date().getFullYear(); year >= 2010; year--) {
      const playlist: Playlist = { year, songs: [], color: getRandomColor() }; // ajoute la couleur aléatoire à chaque playlist
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
  

  return (
<div>
  <h1>Top 50</h1>
  <div className="cards">
    {playlists.map((playlist) => (
      <Link key={playlist.year} to={`/playlist/${playlist.year}`} className="playlist-card">
        <div className='square' style={{background: playlist.color}}></div>
        <h1 className="title">Top 50</h1>
        <h2 className="year">{`${playlist.year}`}</h2>
      </Link>
    ))}
  </div>
</div>


  );
};

export default HomePage;
