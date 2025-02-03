import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import "./Profile.css";

function Profile({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="profile">
      <SideBar handleAddClick={handleAddClick} />
      <ClothesSection
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
      />
    </div>
  );
}

export default Profile;