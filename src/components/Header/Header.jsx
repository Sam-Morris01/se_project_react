import logo from '../../assets/Logo.svg'
import avatar from '../../assets/avatar.svg'
import './Header.css'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { Link } from "react-router-dom";

function Header({handleAddClick, weatherData}) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

  return (
    <header className="header">
      <Link to="/">
        <img
          className="header__logo"
          src={logo}
          alt="WTWR (What to Wear?) logo"
        />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <Link to="/profile" className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </Link>
    </header>
  );
}

export default Header;