import { useState, useEffect } from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css'
import Header from '../Header/Header.jsx'
import Main from '../Main/Main.jsx'
import ModalWithForm from '../ModalWithForm/ModalWithFrom.jsx'
import Call from '../ItemModal/ItemModal.jsx'
import { APIkey, coordinates} from '../../utils/constants.js'
import { getWeather, filterWeatherData } from '../../utils/weatherAPI.js'
import Footer from '../Footer/Footer.jsx'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.jsx'
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { getItems, addItem, deleteItem } from "../../utils/API.js";

import Profile from '../Profile/Profile.jsx'
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx';

function App() {

const [activeModal, setActiveModal] = useState("");
const [selectedCard, setSelectedCard] = useState({});
const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
const [isLoading, setIsLoading] = useState(false);
const [clothingItems, setClothingItems] = useState([]);

const handleToggleSwitchChange = () => {
  setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
};

const [weatherData, setWeatherData] = useState({
  type: "",
  temp: { F: 999 },
  city: "",
});

const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
  setIsLoading(true);
  addItem({ name, imageUrl, weather })
    .then((item) => {
      setClothingItems((prevItems) => [item, ...prevItems]);
      closeActiveModal();
    })
    .catch(console.error)
    .finally(() => {
      setIsLoading(false);
    });
};

const handleCardClick = (card) => {
  setActiveModal("preview");
  setSelectedCard(card);
};

const handleAddClick = () => {
  setActiveModal("add-garment");
};

const closeActiveModal = () => {
  setActiveModal("");
};

const handleDeleteCard = (card) => {
  setActiveModal("confirm-delete");
  setSelectedCard(card);
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
      console.log
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

  return (
    <BrowserRouter basename="/se_project_react">
    <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
    <div className='page'>
      <div className='page__content'>
        <Header handleAddClick={handleAddClick} weatherData={weatherData}/>
        <Routes>
        <Route
        path="/"
        element={
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
        }
        />
        <Route
        path="/profile"
        element={
          <Profile
            clothingItems={clothingItems}
            handleAddClick={handleAddClick}
            onCardClick={handleCardClick}
          />
        }
        />
        </Routes>
        <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        isOpen={activeModal === "add-garment"}


      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              name="weatherType"
              type="radio"
              className="modal__radio-input"
            />{" "}
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              name="weatherType"
              type="radio"
              className="modal__radio-input"
            />{" "}
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              name="weatherType"
              type="radio"
              className="modal__radio-input"
            />{" "}
            Cold
          </label>
        </fieldset>
       
      </ModalWithForm>
      <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />
      <Call
      activeModal={activeModal}
      card={selectedCard}
      onClose={closeActiveModal}
      onDelete={handleDeleteCard}
      />
      <DeleteConfirmationModal
            isOpen={activeModal === "confirm-delete"}
            onClose={closeActiveModal}
            onConfirm={handleConfirmDelete}
            isLoading={isLoading}
          />
        </div>
        <Footer />
    </div>
    </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  )
}
 export default App
