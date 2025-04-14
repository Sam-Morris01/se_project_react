import "./AddItemModal.css";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithFrom.jsx";
import { useFormAndValidation } from "../../hooks/useFormAndValidation.js";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit, isLoading }) {
  const initialValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };

  const { values, handleChange, setValues, errors, isValid } = useFormAndValidation(initialValues);

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: "",
        imageUrl: "",
        weatherType: "",
      });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form values:", values);
    
    if (!isValid) {
      console.log("Form is not valid");
      return;
    }
    
    console.log("Calling onAddItemModalSubmit with:", {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weatherType
    });
    
    if (onAddItemModalSubmit) {
      onAddItemModalSubmit({
        name: values.name || "",
        imageUrl: values.imageUrl || "",
        weather: values.weatherType || "",
      });
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      disabled={!isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ""}
        />
        {errors?.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl || ""}
        />
        {errors?.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className="modal__label modal__label_type_radio"
          >
            <input
              id={type}
              name="weatherType"
              type="radio"
              className="modal__radio-input"
              value={type}
              onChange={handleChange}
              checked={values.weatherType === type}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;