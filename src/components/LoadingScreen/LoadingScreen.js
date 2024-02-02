import './LoadingScreen.scss';
import logo from '../../assets/imgs/logo-symbol.png'

const LoadingScreen = ({ loading }) => {
  if (loading) {
    return <div data-testid="loading-screen" className="loading-screen-container">
      <div className="loading-screen-bg"></div>
      <img src={logo} alt="Logo" className="loading-screen-img" />
      <span className="loading-screen-text">Cargando...</span>
    </div>
  } else return null;
};

export default LoadingScreen;