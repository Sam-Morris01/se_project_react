import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./SideBar.css";

function SideBar({ onEditProfile, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-menu">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="user avatar image"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button className="sidebar__button" onClick={onEditProfile}>
          Edit profile data
        </button>
        <button className="sidebar__button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
