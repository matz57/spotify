import "./LeftDrawer.css";
import { Link } from 'react-router-dom';
import { Layout, Menu } from "antd";
import spotify_logo from '../assets/LeftDrawerAssets/Spotify_logo.png';
import home_logo from '../assets/LeftDrawerAssets/home_logo.png';
import create_logo from '../assets/LeftDrawerAssets/create_logo.png';


const LeftDrawer = () => {
  const { Sider } = Layout;

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
      <div className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px 0' }}>
        <img src={spotify_logo} alt="Spotify Logo" style={{ width: '80%' }} />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
      >
        <Menu.Item key="/" icon={<img src={home_logo} alt="Home" />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<img width='30px' src={create_logo} alt="Create Playlist" />}>
          <Link to="/create-playlist">Create Playlist</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<div style={{ background: 'linear-gradient(to bottom, purple, white)', height: '30px', width: '30px' }}></div>}>
          <Link to="/liked-songs">Liked Songs</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default LeftDrawer;
