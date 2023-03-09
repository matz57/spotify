import React from "react";
import "./LeftDrawer.css";
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { Layout, Menu, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import spotify_logo from '../assets/LeftDrawerAssets/Spotify_logo.png';
import home_logo from '../assets/LeftDrawerAssets/home_logo.png';
import create_logo from '../assets/LeftDrawerAssets/create_logo.png';


const LeftDrawer = () => {

    return(

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
        <div className="logo" />
        <img className="logo" src={spotify_logo}></img>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={[
            {
              key: '/',
              icon: <img src={home_logo}></img>,
              label: 'Home',
            },
            {
              key: '2',
              icon: <img width='30px' src={create_logo}></img>,
              label: 'Create Playlist',
            },
            {
              key: '3',
              icon: (
                <div style={{ 
                  background: 'linear-gradient(to bottom, purple, white)',
                  height: '30px',
                  width: '30px'
                }}></div>
              ),
              label: 'Liked Songs',
            },
          ]}
        />
      </Sider>
   
    )
    
}


export default LeftDrawer;
