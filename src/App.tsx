import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Player from './Footer';
import './index.css';
import LeftDrawer from './LeftDrawer';
import HomePage from './HomePage';
import PlaylistDetailPage from './PlaylistDetailPage/PlaylistDetailPage';

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <LeftDrawer />
      <Layout className='primaryLayout'>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ marginLeft: '200px', padding: 24, minHeight: 360, }}>
            <main className="App-main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
              </Routes>
            </main>
          </div>
        </Content>
        <Footer style={{textAlign: 'center', backgroundColor: 'rgb(34,34,34)', position: 'sticky', bottom: 0, width: '100%', maxHeight: 120, minHeight: 120}}><Player /></Footer>
      </Layout>
    </Layout>
  );
}


export default App;
