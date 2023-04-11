import "./LeftDrawer.css";
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from "antd";
import spotify_logo from '../assets/LeftDrawerAssets/Spotify_logo.png';
import home_logo from '../assets/LeftDrawerAssets/home_logo.png';
import create_logo from '../assets/LeftDrawerAssets/create_logo.png';
import ModalCreatePlaylist from "../ModalCreatePlaylist";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const LeftDrawer = () => {
  const { Sider } = Layout;
  const { playlists } = useSelector((state: RootState) => state.playlists);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreatePlaylistClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Sider trigger={null} collapsible
      style={{overflow: 'auto', overflowY: 'scroll', maxHeight: `calc(100vh - ${120}px)`,height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, backgroundColor: 'black',}}>
      <div className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px 0', margin: '10px' }}>
        <img src={spotify_logo} alt="Spotify Logo" style={{ width: '80%' }} />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key="1" icon={<img src={home_logo} alt="Home" />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<img src={create_logo} alt="Create Playlist" />} onClick={handleCreatePlaylistClick}>
          <Button type="link" style={{ left: '-16px', color: 'white' }}>Create Playlist</Button>
        </Menu.Item>
        <Menu.Item key="3" icon={<div style={{ background: 'linear-gradient(to bottom, purple, white)', height: '30px', width: '30px' }}></div>}>
          <Link to="/playlist/likedSongs" style={{ marginLeft: '7px' }}>Liked Songs</Link>
        </Menu.Item>
      </Menu>
      <ModalCreatePlaylist visible={isModalVisible} onCancel={handleModalCancel} />
      <div className="playlist-link-list">
        {playlists.filter((playlist) => playlist.id !== 'likedSongs').map((playlist) => (
          <Link key={playlist.id} to={`/playlist/${playlist.id}`} className="playlist-link-drawer">
            <p>{playlist.name}</p>
          </Link>
        ))}
      </div>
    </Sider>
  )
}

export default LeftDrawer;
