import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithFrom";

const RegisterModal = ({
  isOpen,
  onRegister,
  closeActiveModal,
  buttonText,
  onRegisterClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const isFormInvalid = !email || !password || !name || !avatar;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      title="Sign Up"
      buttonText={buttonText}
      alternativeButtonText="or Log in"
      onAlternativeClick={onRegisterClick}
      disabled={isFormInvalid}
    >
      <label className="modal__label" htmlFor="email-register">
        Email*{" "}
        <input
          className="modal__input"
          type="email"
          id="email-register"
          placeholder="Email"
          name="email"
          value={email}
          minLength="1"
          maxLength="60"
          required
          onChange={handleEmailChange}
        />
      </label>

      <label className="modal__label" htmlFor="password-register">
        Password*{" "}
        <input
          className="modal__input"
          type="password"
          id="password-register"
          placeholder="Password"
          name="password"
          value={password}
          minLength="1"
          maxLength="30"
          required
          onChange={handlePasswordChange}
        />
      </label>

      <label className="modal__label" htmlFor="name-register">
        Name*{" "}
        <input
          className="modal__input"
          type="text"
          id="name-register"
          placeholder="Name"
          name="name"
          value={name}
          minLength="1"
          maxLength="30"
          required
          onChange={handleNameChange}
        />
      </label>

      <label className="modal__label" htmlFor="avatar-register">
        Avatar URL*{" "}
        <input
          className="modal__input"
          type="url"
          id="avatar-register"
          placeholder="Avatar URL"
          name="avatar"
          value={avatar}
          minLength="1"
          required
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;