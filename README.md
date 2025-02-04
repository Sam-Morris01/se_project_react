# WTWR (What to Wear?)

![WTWR Logo](assets/Logo.svg)

## Overview

WTWR (What to Wear?) is a React-based weather and clothing recommendation app that suggests appropriate clothing based on the current weather conditions. The application integrates real-time weather data and allows users to manage a virtual wardrobe.

## Features

- **Real-Time Weather Data**: Fetches weather data based on predefined coordinates.
- **Clothing Recommendations**: Suggests clothing items based on temperature.
- **User Wardrobe Management**: Users can add, view, and delete clothing items.
- **Interactive UI**: Modals, toggle switches, and smooth interactions for a better experience.
- **Responsive Design**: Optimized for different screen sizes.
- **React Context API**: Used for state management.

## Technologies Used

- **Frontend**: React, React Router, JavaScript (ES6+), CSS
- **State Management**: React Hooks, Context API
- **API Integration**: OpenWeather API
- **Build Tools**: Webpack, Babel
- **Styling**: CSS Modules

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/wtwr-react.git
   cd wtwr-react
2. Install dependencies: npm install
3. Start the development server: npm start dev
4. Open in your browser: http://localhost:3000


## Project Structure

📂 src
 ├── 📂 components        # Reusable UI components
 │    ├── Header.jsx
 │    ├── WeatherCard.jsx
 │    ├── ClothesSection.jsx
 │    ├── ItemCard.jsx
 │    ├── ToggleSwitch.jsx
 │    ├── Profile.jsx
 │    ├── ModalWithForm.jsx
 │    ├── AddItemModal.jsx
 │    ├── ItemModal.jsx
 │    ├── Main.jsx
 ├── 📂 contexts          # Context API for global state management
 │    ├── CurrentTemperatureUnitContext.jsx
 ├── 📂 hooks             # Custom hooks for reusable logic
 │    ├── useFormAndValidation.js
 │    ├── useModalClose.js
 ├── 📂 utils             # Utility functions and constants
 │    ├── constants.js
 │    ├── weatherAPI.js
 ├── App.jsx              # Main application component
 ├── index.js             # Entry point
 ├── styles.css           # Global styles


## API Integration
-- Weather Data: Uses getWeather(coordinates, APIkey) to fetch current weather data.
-- Clothing Items: Allows users to manage their wardrobe through getItems(), addItem(), and deleteItem() API calls.

## Contributing
Feel free to fork this repository and contribute! Open a pull request with your feature or bug fix.
