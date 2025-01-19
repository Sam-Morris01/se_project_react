import WeatherCard from "../WeatherCard/WeatherCard.jsx"
import {defaultClothingItems} from '../../utils/constants.js'
import ItemCard from "../CardItem/ItemCard.jsx"
import './Main.css'

function Main ({weatherData, handleCardClick}) {
  return (
    <main className='main'>
        <section className="cards">
            <WeatherCard weatherData={weatherData}/>
            <p className="cards__text">Today is {weatherData.temp.F} &deg;F / You may want to wear:</p>
            <ul className="cards__list">
                {defaultClothingItems.filter((item) =>{
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