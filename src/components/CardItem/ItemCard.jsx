import "./ItemCard.css";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext) || {};

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  const isLiked =
    (currentUser && item?.likes?.some((id) => id === currentUser._id)) || false;

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;


  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        alt={item.name}
        src={item.imageUrl}
      />
      {currentUser && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
        />
      )}
    </li>
  );
}

export default ItemCard;
