import "./LeftDrawer.css";
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from "antd";
import spotify_logo from '../assets/LeftDrawerAssets/Spotify_logo.png';
import home_logo from '../assets/LeftDrawerAssets/home_logo.png';
import create_logo from '../assets/LeftDrawerAssets/create_logo.png';
import ModalCreatePlaylist from "../ModalCreatePlaylist";
import { useState } from "react";

const LeftDrawer = () => {
  const { Sider } = Layout;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreatePlaylistClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Sider trigger={null} collapsible
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'black',
      }}
    >
      <div className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px 0', margin: '10px' }}>
        <a href="/"><img src={spotify_logo} alt="Spotify Logo" style={{ width: '80%' }} /></a>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
      >
        <Menu.Item key="/" icon={<img src={home_logo} alt="Home" />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<img src={create_logo} alt="Create Playlist" />} onClick={handleCreatePlaylistClick}>
          <Button type="link" style={{ left: '-16px', color: 'white' }}>Create Playlist</Button>
        </Menu.Item>
        <Menu.Item key="3" icon={<div style={{ background: 'linear-gradient(to bottom, purple, white)', height: '30px', width: '30px' }}></div>}>
          <Link to="/liked-songs" style={{ marginLeft: '7px' }}>Liked Songs</Link>
        </Menu.Item>
      </Menu>
      <ModalCreatePlaylist visible={isModalVisible} onCancel={handleModalCancel} />
    </Sider>
  )
}

export default LeftDrawer;
