import logo from '../../assets/Logo.svg'
import avatar from '../../assets/avatar.svg'
import './Header.css'

function Header({handleAddClick, weatherData}) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

  return (
    <header>
      <div className="header">
        <img 
        src={logo} 
        alt="WTWR logo"  
        className="header__logo" 
        />
        <p className="header__date-location">{currentDate}, {weatherData.city}</p>
        <button className='header__add-btn' onClick={handleAddClick}>+ Add Clothes</button>
        <div className="header__user-container">
          <p className="header__username">Sam Morris</p>
          <img 
          src={avatar}
          alt="User avatar" 
          className="header__avatar" 
          />
        </div>
      </div>
    </header>
  );
}

export default Header;