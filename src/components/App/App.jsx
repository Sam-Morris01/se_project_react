import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import { APIkey, coordinates } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI.js";
import { getItems, addItem, deleteItem, removeCardLike, addCardLike } from "../../utils/API.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getToken, removeToken, checkToken, signUp, signIn } from "../../utils/auth";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";



function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);


  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    console.log("handleAddItemModalSubmit called with:", { name, imageUrl, weather });
    
    if (!isLoggedIn) {
      console.error("You must be logged in to add items");
      return;
    }

    console.log("User is logged in, proceeding with API call");
    setIsLoading(true);
    
    addItem({ name, imageUrl, weather })
      .then((item) => {
        console.log("Item added successfully:", item);
        setClothingItems((prevItems) => [item, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Universal handler function
  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // Handle card click
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

    // Handle Likes
    const handleCardLike = ({ id, isLiked }) => {
      console.log("Like clicked for item:", id, "isLiked:", isLiked);
      
      (!isLiked ? addCardLike(id) : removeCardLike(id))
        .then((updatedCard) => {
          console.log("Server response:", updatedCard);
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => {
          console.error("Error updating like status:", err);
        });
    };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

    //Open "Login" Modal
  const handleLoginClick = () => {
    setActiveModal("login");
  };

  //Open "Registration" Modal
  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  //Handle Logging in
  const handleLogin = ({ email, password }) => {
    const makeRequest = async () => {
      try {
        const userData = await signIn({ email, password });
        console.log("Login response:", userData);
        if (userData.jwt) {
          setIsLoggedIn(true);
          const userInfo = await checkToken(userData.jwt);
          setCurrentUser(userInfo);
        } else {
          console.error("No JWT token received in login response");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    };

    handleSubmit(makeRequest);
  };

    //Open "confirm-delete" Modal
    const openConfirmDeleteModal = (card) => {
      setCardToDelete(card);
      setActiveModal("confirm-delete");
    };

  //Handle Registration
  const handleRegistration = ({ name, avatar, email, password }) => {
    const makeRequest = async () => {
      const userData = await signUp({ email, password, name, avatar });
      setIsLoggedIn(true);
      setCurrentUser(userData);
    };

    handleSubmit(makeRequest);
  };

  // Handle Logging Out
  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };


  const closeActiveModal = () => {
    setActiveModal("");
  };



  const handleConfirmDelete = () => {
    setIsLoading(true);
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
        setSelectedCard({});
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        console.log;
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);



  //Check for an existing Token
  useEffect(() => {
    const checkUserSession = async () => {
      setIsCheckingAuth(true);
      try {
        const token = getToken();
        if (token) {
          const userData = await checkToken(token);
          setIsLoggedIn(true);
          setCurrentUser(userData);
        } else {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        setIsLoggedIn(false);
        setCurrentUser(null);
        removeToken();
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkUserSession();
  }, []);


  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
      {isCheckingAuth ? null : (
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    onCardClick={handleCardClick}
                    handleLogout={handleLogout}
                    onCardLike={handleCardLike}
                  />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
            <Footer />
            </div>

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
              isLoading={isLoading}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={() => openConfirmDeleteModal(selectedCard)}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "confirm-delete"}
              onClose={closeActiveModal}
              onConfirm={handleConfirmDelete}
              isLoading={isLoading}
              cardName={cardToDelete?.name}
            />

            <RegisterModal
              isOpen={activeModal === "register"}
              onRegister={handleRegistration}
              closeActiveModal={closeActiveModal}
              buttonText={"Sign up"}
              onRegisterClick={handleLoginClick}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onLogin={handleLogin}
              closeActiveModal={closeActiveModal}
              buttonText={"Log in"}
              onLoginClick={handleRegisterClick}
            />

      </CurrentTemperatureUnitContext.Provider>
      )}
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
