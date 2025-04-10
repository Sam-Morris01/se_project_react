import { useRef, useEffect, useState } from "react";
import useModalClose from "../../hooks/useModalClose";
import "./ModalWithForm.css";
import closeButton from "../../assets/close.svg";



function ModalWithForm({ children, buttonText, title, closeActiveModal, isOpen, onSubmit, isLoading, alternativeButtonText, onAlternativeClick, disabled}) {
  useModalClose(isOpen, closeActiveModal);
  const formRef = useRef(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkValidity = () => {
      if (formRef.current) {
        setIsValid(formRef.current.checkValidity() && !disabled);
      }
    };

    checkValidity();

    const form = formRef.current;
    if (form) {
      form.addEventListener("input", checkValidity);
      return () => form.removeEventListener("input", checkValidity);
    }
  }, [isOpen, disabled]);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_input">
        <h2 className="modal__title">{title}</h2>
        <button
        onClick={closeActiveModal}
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
        <form
          ref={formRef}
          className="modal__form"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <div className="modal__button-container">
          <button 
          type="submit" 
          className={`modal__submit ${isValid ? "modal__submit_valid" : ""}`}
          disabled={!isValid || isLoading}
          >

            {buttonText}
          </button>
          {alternativeButtonText && (
              <button
                className="modal__alternative-button"
                type="button"
                onClick={onAlternativeClick}
              >
                {alternativeButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
