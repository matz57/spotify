import MusicPlayerSVG from '../assets/FooterAssets/music_player.svg';
import MusicOptionsSVG from '../assets/FooterAssets/music_options.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


const Player = () => {
  const selectedSong = useSelector((state: RootState) => state.playlists.selectedSong);

  return (
    <div>
      {selectedSong ? (
        <div style={{marginBottom: -30, textAlign: 'left', color: 'white'}}>
          <div>
            <div className="footer-square"></div>
            <div style={{ marginLeft: 10, }}>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{selectedSong.title}</div>
              <div style={{ fontSize: 16, color: 'gray' }}>{selectedSong.artist}</div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div style={{ textAlign: 'center', marginLeft: '28%' }}>
        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <img style={{ display: 'block' }} width='80%' src={MusicPlayerSVG} />
        </div>
        <div style={{ display: 'inline-block', verticalAlign: 'middle', textAlign: 'right' }}>
          <img style={{ display: 'block' }} width='80%%' src={MusicOptionsSVG} />
        </div>
      </div>
    </div>
  );
}
export default Player;