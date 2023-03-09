import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import Player from './Footer';
import './index.css';
import LeftDrawer from './LeftDrawer';
import HomePage from './HomePage';

const App = () => {
    return (
    <Layout style={{ minHeight: '100vh',  }}>
    <LeftDrawer></LeftDrawer>
    <Layout>
      <Content style={{ margin: '0 16px', }}>
        <div style={{ marginLeft: '200px',padding: 24, minHeight: 360, }}>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'rgb(34,34,34)', position: 'absolute',
          bottom: 0,
          width: '100%', }}><Player></Player></Footer>
    </Layout>
  </Layout>
);
}


export default App;
