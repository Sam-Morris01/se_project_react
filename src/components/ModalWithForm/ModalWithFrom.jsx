import "./ModalWithForm.css";
import closeButton from "../../assets/close.svg";
import { useEffect } from "react";

function ModalWithForm({ children, buttonText, title, onClose, isOpen, onSubmit, isLoading, isValid }) {

  useEffect(() => {
    if (!isOpen) {
      const form = document.querySelector(".modal__form");
      if (form) {
        form.reset();
      }
    }
  }, [isOpen]);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_input">
        <h2 className="modal__title">{title}</h2>
        <button
        onClick={onClose}
        type="button"
        className="modal__close"
        disabled={isLoading}
        >
          <img
            src={closeButton}
            alt="close button"
            className="modal__close-icon"
          />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button 
          type="submit" 
          className={`modal__submit ${isValid ? "modal__submit_valid" : ""}`}
          disabled={!isValid || isLoading}
          >

            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
