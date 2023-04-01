import MusicPlayerSVG from '../assets/FooterAssets/music_player.svg';
import MusicOptionsSVG from '../assets/FooterAssets/music_options.svg';


const Player = () => {

  return (
    <div style={{ textAlign: 'center', marginLeft: '28%' }}>
      <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <img style={{ display: 'block' }} width='80%' src={MusicPlayerSVG} />
      </div>
      <div style={{ display: 'inline-block', verticalAlign: 'middle', textAlign: 'right' }}>
        <img style={{ display: 'block' }} width='80%%' src={MusicOptionsSVG} />
      </div>
    </div>
  );
}
export default Player;