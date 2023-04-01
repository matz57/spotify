import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setTop50Playlists, Playlist, Top50Playlist } from '../Slices/playlistsSlice';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { top50Playlists } = useSelector((state: RootState) => state.playlists);

  // générer les playlists
  const generateTop50Playlists = (): Top50Playlist[] => {
    const data = require('../static/data.json');
    const top50PlaylistsData: Top50Playlist[] = [];
    const randomColor = (): string => {
      const color1 = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      const color2 = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      return `linear-gradient(135deg, ${color1}, ${color2})`;
    };

    for (let year = new Date().getFullYear(); year >= 2010; year--) {
      const playlist: Top50Playlist = { id: `${year}`, name: "Top 50", year, songs: [], color: randomColor() };
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
      <h1>Top 50</h1>
      <div className="cards">
        {top50Playlists.map((playlist) => (
          <Link key={playlist.id} to={`/playlist/${playlist.year}`} className="playlist-card">
            <div className='square' style={{ background: playlist.color }}></div>
            <h1 className="title">{playlist.name}</h1>
            <h2 className="year">{`${playlist.year}`}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
