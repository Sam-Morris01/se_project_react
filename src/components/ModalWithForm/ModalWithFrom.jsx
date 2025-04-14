import { useRef, useEffect, useState } from "react";
import useModalClose from "../../hooks/useModalClose";
import "./ModalWithForm.css";
import closeButton from "../../assets/close.svg";

function ModalWithForm({ children, buttonText, title, onClose, isOpen, onSubmit, isLoading, alternativeButtonText, onAlternativeClick, disabled}) {
  useModalClose(isOpen, onClose);
  const formRef = useRef(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    console.log("ModalWithForm mounted/updated, isOpen:", isOpen);
    const checkValidity = () => {
      if (formRef.current) {
        const formIsValid = formRef.current.checkValidity() && !disabled;
        console.log("Form validity checked:", formIsValid);
        setIsValid(formIsValid);
      }
    };

    checkValidity();

    const form = formRef.current;
    if (form) {
      form.addEventListener("input", checkValidity);
      return () => form.removeEventListener("input", checkValidity);
    }
  }, [isOpen, disabled]);

  const handleFormSubmit = (e) => {
    console.log("Form submit event triggered");
    e.preventDefault();
    if (onSubmit) {
      console.log("Calling onSubmit handler");
      onSubmit(e);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_input">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
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
          onSubmit={handleFormSubmit}
          noValidate
        >
          {children}
          <div className="modal__button-container">
            <button 
              type="submit" 
              className={`modal__submit ${isValid ? "modal__submit_valid" : ""}`}
              disabled={!isValid || isLoading}
            >
              {isLoading ? "Saving..." : buttonText}
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
