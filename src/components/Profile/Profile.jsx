import React from "react";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import EditProfileModal from "./EditProfileModal.jsx";

import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { updateProfile, getToken } from "../../utils/auth";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleLogout,
  onCardLike,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] =
    React.useState(false);

  /*
  const likedItems = clothingItems.filter(
    (item) =>
      item?.likes && currentUser?._id && item.likes.includes(currentUser._id)
  );
  */

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleProfileUpdate = async (updatedData) => {
    try {
      const updatedUser = await updateProfile(getToken(), updatedData);

      setCurrentUser(updatedUser);
      handleCloseEditProfileModal();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfile={handleEditProfileClick}
          onLogout={handleLogout}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={handleCloseEditProfileModal}
        onSubmit={handleProfileUpdate}
      />
    </div>
  );
}

export default Profile;