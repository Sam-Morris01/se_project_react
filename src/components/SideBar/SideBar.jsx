import "./SideBar.css";
import avatar from "../../assets/Avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__info">
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </div>
  );
}

export default SideBar;