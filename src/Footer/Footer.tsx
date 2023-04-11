import MusicPlayerSVG from '../assets/FooterAssets/music_player.svg';
import MusicOptionsSVG from '../assets/FooterAssets/music_options.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


const Player = () => {
  const selectedSong = useSelector((state: RootState) => state.playlists.selectedSong);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {selectedSong ? (
        <div style={{ textAlign: 'left', color: 'white', maxWidth: 350 }}>
          <div>
            <div className="footer-square"></div>
            <div style={{ marginLeft: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{selectedSong.title}</div>
              <div style={{ fontSize: 16, color: 'gray' }}>{selectedSong.artist}</div>
            </div>
          </div>
        </div>
      ) : null}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
        <img style={{ display: 'block', width: '60%' }} src={MusicPlayerSVG} />
        <img style={{ display: 'block', width: '30%', marginLeft: '10%' }} src={MusicOptionsSVG} />
      </div>
    </div>
  );
}
export default Player;