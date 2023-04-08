import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setTop50Playlists, Playlist, Top50Playlist } from '../Slices/playlistsSlice';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { top50Playlists, playlists } = useSelector((state: RootState) => state.playlists);

  // générer les playlists Top 50 dès la page Home
  const generateTop50Playlists = (): Top50Playlist[] => {
    const data = require('../static/data.json');
    const top50PlaylistsData: Top50Playlist[] = [];
    const randomColor = () => {
      const color1 = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      const color2 = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      return `linear-gradient(135deg, ${color1}, ${color2})`;
    };

    for (let year = 2019; year >= 2010; year--) {
      const playlist: Top50Playlist = { id: `${year}`, name: "TOP 50 - " + year, year, songs: [], color: randomColor() };
      data.forEach((song: any) => {
        if (song.year === year) {
          playlist.songs.push(song);
        }
      });
      if (playlist.songs.length > 0) {
        top50PlaylistsData.push(playlist);
      }
    }
    return top50PlaylistsData;
  };

  useEffect(() => {
    const top50PlaylistsData: Top50Playlist[] = generateTop50Playlists();
    dispatch(setTop50Playlists(top50PlaylistsData));
  }, [dispatch]);

  return (
    <div>
      <h1>Your playlists</h1>
      <div className="cards">
      <Link key='liked' to={`/liked-songs`} className="card">
            <div className='square' style={{ background: 'linear-gradient(to bottom, purple, white)' }}></div>
            <h1 className="title">Liked Songs</h1>
          </Link>
        {playlists.map((playlist) => (
          <Link key={playlist.id} to={`/playlist/${playlist.id}`} className="card">
            <div className='square' style={{ background: playlist.color }}></div>
            <h1 className="title">{playlist.name}</h1>
          </Link>
        ))}
      </div>
      <div>
        <h1>Top 50</h1>
        <div className="top50-cards">
          {top50Playlists.map((playlist) => (
            <Link key={playlist.id} to={`/playlist/${playlist.id}`} className="top50-playlist-card">
              <div className='top50-square' style={{ background: playlist.color }}>
                <div>
                  <h1>TOP 50</h1>
                  <h2>{playlist.year}</h2>
                </div>
              </div>
              <h1 className="top50-title">TOP 50</h1>
              <h2 className="year">{playlist.year}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
