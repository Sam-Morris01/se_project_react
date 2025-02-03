import WeatherCard from "../WeatherCard/WeatherCard.jsx"
import ItemCard from "../CardItem/ItemCard.jsx"
import './Main.css'
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main ({weatherData, handleCardClick, clothingItems = []}) {
    const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main className='main'>
        <section className="cards">
            <WeatherCard weatherData={weatherData}/>
            <p className="cards__text">Today is {weatherData.temp[currentTemperatureUnit]} &deg;{currentTemperatureUnit} / You may want to wear:</p>
            <ul className="cards__list">
                {clothingItems.filter((item) =>{
                    return item.weather === weatherData.type;
                }).map((item) => {
                    return (
                        <ItemCard 
                        key={item._id} 
                        item={item} 
                        onCardClick={handleCardClick}
                        />
                    );
                })}
            </ul>
        </section>
    </main>
  );   
}

export default Main