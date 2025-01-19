import "./ItemModal.css";
import closeButton from "../../assets/close-white.svg";

function Call ({activeModal, card, onClose}) {
  return (
    <div className={`modal ${activeModal === 'preview' && "modal_opened"}`}>
        <div className="modal__content modal__content_type_image">
            <button onClick={onClose} type="button" className="modal__close">
                <img
                src={closeButton}
                alt="close button"
                className="modal__close-icon"
                />
            </button>
            <img src={card.link} alt={card.name} className="modal__image" />
            <div className="modal__overlay">
                <h2 className="modal__caption">{card.name}</h2>
                <p className="modal__weather">Weather: {card.weather}</p>
            </div>
        </div>
    </div>
  );
}

export default Call;