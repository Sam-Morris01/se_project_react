# WTWR (What to Wear?)

![WTWR Logo](assets/Logo.svg)

## Overview

WTWR (What to Wear?) is a full-stack application that suggests appropriate clothing based on the current weather conditions. The application integrates real-time weather data and allows users to manage a virtual wardrobe.

## Features

- **Real-Time Weather Data**: Fetches weather data based on predefined coordinates.
- **Clothing Recommendations**: Suggests clothing items based on temperature.
- **User Authentication**: Secure login and registration system.
- **User Wardrobe Management**: Users can add, view, and delete clothing items.
- **Like System**: Users can like/unlike clothing items.
- **Interactive UI**: Modals, toggle switches, and smooth interactions.
- **Responsive Design**: Optimized for different screen sizes.

## Technologies Used

### Frontend
- React
- React Router
- JavaScript (ES6+)
- CSS Modules
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

## Repository Links

- Frontend (Current Repository): [WTWR Frontend](https://github.com/your-username/wtwr-react)
- Backend Repository: [WTWR Backend](https://github.com/Sam-Morris01/se_project_express.git)

## Installation & Setup

### 1. Backend Setup
1. Clone the backend repository:
   ```sh
   git clone https://github.com/practicum-student/se_project_express.git
   cd se_project_express
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start MongoDB:
   ```sh
   # Make sure MongoDB is running on your system
   mongod
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```
   The server will run on http://localhost:3001

### 2. Frontend Setup
1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/wtwr-react.git
   cd wtwr-react
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open in your browser:
   ```
   http://localhost:3000
   ```

## Project Structure

📂 src
 ├── 📂 components        # Reusable UI components
 ├── 📂 contexts          # Context API for global state management
 ├── 📂 hooks             # Custom hooks for reusable logic
 ├── 📂 utils             # Utility functions and constants
 ├── App.jsx              # Main application component
 ├── index.js             # Entry point

## API Integration

### Weather API
- Uses OpenWeather API to fetch current weather data
- Configured in `utils/weatherAPI.js`

### Backend API Endpoints
- **Authentication**
  - POST `/signup` - Register new user
  - POST `/signin` - Login user
  - GET `/users/me` - Get current user info

- **Clothing Items**
  - GET `/items` - Get all clothing items
  - POST `/items` - Create new clothing item
  - DELETE `/items/:itemId` - Delete clothing item
  - PUT `/items/:itemId/likes` - Like an item
  - DELETE `/items/:itemId/likes` - Unlike an item

## Environment Variables
Create a `.env` file in the root directory with:
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
```

## Contributing
Feel free to fork this repository and contribute! Open a pull request with your feature or bug fix.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
