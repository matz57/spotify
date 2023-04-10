import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { Table, Select, Input, ConfigProvider, theme } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './PlaylistDetailPage.css';
import { Song, addLikedSongs, updateSelectedSong } from '../Slices/playlistsSlice';

const { Option } = Select;
const { Search } = Input;

const PlaylistDetailPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const [sortCol, setSortCol] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const { id } = useParams<{ id: string }>();
  const { top50Playlists, playlists } = useSelector((state: RootState) => state.playlists);
  const likedSongsPlaylist = useSelector((state: RootState) => playlists.find((playlist) => playlist.id === 'likedSongs')
  );
  const dispatch = useDispatch();

  const isSongLiked = (song: Song) =>
    likedSongsPlaylist && likedSongsPlaylist.songs.findIndex((likedSong) => likedSong.title === song.title && likedSong.artist === song.artist && likedSong.genre === song.genre) !== -1;

  const handleFavoriteClick = (record: any) => {
    dispatch(addLikedSongs(record));
  };

  const handleSelectedSong = (song: Song) => {
    dispatch(updateSelectedSong(song));
  };

  const handleChange = (value: string) => {
    setSortCol(value);
    setSortOrder(value === '' ? '' : 'ascend');
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const columns = [
    {
      title: '',
      key: 'favorite',
      render: (record: Song) => (
        <span onClick={() => handleFavoriteClick(record)}>
          {isSongLiked(record) ? <HeartFilled style={{ color: 'rgba(29, 185, 84, 1)' }} /> : <HeartOutlined />}
        </span>
      ),
    },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Artist', dataIndex: 'artist', key: 'artist' },
    { title: 'Genre', dataIndex: 'genre', key: 'genre' },
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    { title: 'Popularity', dataIndex: 'popularity', key: 'popularity' },
  ];

  const currentPlaylist = top50Playlists.find((playlist: any) => playlist.id === id) || playlists.find((playlist: any) => playlist.id === id);

  const data = currentPlaylist?.songs || [];

  const filteredData = sortOrder
    ? [...data].sort((a: any, b: any) =>
      a[sortCol].localeCompare(b[sortCol], undefined, { numeric: true })
    )
    : data;


  /* Si il n'y a rien dans la barre de recherche on affiche la liste triée sinon on affiche
  les résultats correspondants au texte dans la barre de recherche */
  const searchedData =
    searchText === ''
      ? filteredData
      : filteredData.filter((item: any) =>
        Object.keys(item).some(
          (key) =>
            item[key].toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1 &&
            (searchColumn === '' || searchColumn === key)
        )
      );

  if (!currentPlaylist) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><h1>Unknown playlist</h1></div>
  }

  return (
    <div className="playlist-detail-page">
      <div className='detail-header'>
        <div className='detail-square' style={{ background: currentPlaylist?.color }}></div>
        <h1 className='detail-title'>{currentPlaylist?.name}</h1>
      </div>
      <div className="filter-bar">
        <ConfigProvider
          theme={{ algorithm: theme.darkAlgorithm }}>
          <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
            <Option value="">Default</Option>
            {columns.map((column) => {
              if (column.key === 'favorite') {
                return null;
              }
              return (
                <Option key={column.key} value={column.key}>
                  {column.title}
                </Option>
              );
            })}
          </Select>
          <Search
            placeholder="Search"
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
        </ConfigProvider>
      </div>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Table className="playlist-table" columns={columns} dataSource={searchedData} rowKey={(record) => record.title} pagination={false}  onRow={(record) => ({onClick: () => handleSelectedSong(record)})} />
      </ConfigProvider>
    </div>
  );
};

export default PlaylistDetailPage;
