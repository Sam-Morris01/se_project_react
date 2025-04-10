import "./ItemModal.css";
import closeButton from "../../assets/close-white.svg";
import useModalClose from '../../hooks/useModalClose.js';
import {useContext} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function ItemModal ({activeModal, card, closeActiveModal, onDelete}) {
  useModalClose(activeModal === "preview", closeActiveModal);
  const { currentUser } = useContext(CurrentUserContext) || {};

  const isOwn =
    currentUser && card && card.owner ? card.owner === currentUser._id : false;

  return (
    <div className={`modal ${activeModal === 'preview' && "modal_opened"}`}>
        <div className="modal__content modal__content_type_image">
            <button onClick={closeActiveModal} type="button" className="modal__close">
                <img
                src={closeButton}
                alt="close button"
                className="modal__close-icon"
                />
            </button>
            <img src={card.imageUrl} alt={card.name} className="modal__image" />
            <div className="modal__overlay">
                <h2 className="modal__caption">{card.name}</h2>
                <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            {isOwn && (
                <button
                type="button"
                className="modal__delete-button"
                onClick={() => onDelete(card)}
              >
                Delete Item
              </button>
            )}
         
        </div>
    </div>
  );
}

export default ItemModal;