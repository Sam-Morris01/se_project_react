
import  { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithFrom";

const LoginModal = ({
  isOpen,
  onLogin,
  closeActiveModal,
  buttonText,
  onLoginClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };
  
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setPasswordError(false);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      title="Log in"
      buttonText={buttonText}
      alternativeButtonText="or Sign up"
      onAlternativeClick={onLoginClick}
      disabled={passwordError}
    >
      <label className="modal__label" htmlFor="email-login">
        Email
        <input
          className="modal__input"
          id="email-login"
          type="email"
          placeholder="Email"
          value={email}
          minLength="1"
          maxLength="60"
          required
          onChange={handleEmailChange}
        />
      </label>

      <label
        className={`modal__label ${
          passwordError ? "modal__label_type_error" : ""
        }`}
        htmlFor="password-login"
      >
        {passwordError ? "Incorrect password" : "Password"}
        <input
          className={`modal__input ${
            passwordError ? "modal__input_type_error" : ""
          }`}
          id="password-login"
          type="password"
          placeholder="Password"
          value={password}
          minLength="1"
          maxLength="30"
          required
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
