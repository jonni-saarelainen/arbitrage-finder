# Arbie - Arbitrage Finder
Full-stack web application project that finds sports betting arbitrage opportunities by fetching odds from multiple bookmakers using [Odds Api](https://the-odds-api.com/), calculating implied probabilities, and identifying profitable combinations.  
Built this as a learning-focused full-stack application and it is intended to run locally in a development environment only.
## 🚀 Whats The Idea?
- Fetches live sports odds from a third-party Odds Api
- Calculates arbitrage opportunities on the backend
- Displays ROI, implied probability, and optimal stake distribution
- Clean, component-based React UI
- Backend API built with Node.js and Express
## 📦 Technologies
### Frontend
- React(Vite)
- JavaScript (ES6+)
- CSS Modules
### Backend
- Node.js
- Express
## 🔑 API Key Handling
### The Odds API key is handled server-side using environment variables.
- User provides their own API key to a .env file in the backend directory
- The backend reads the API key from the .env file in order to use it for fetching odds data
- For setting API key check .env.example file
## 📸 Screenshots
<img width="1905" height="1079" alt="image" src="https://github.com/user-attachments/assets/d4bf6e2c-9a2e-401e-ba30-6d7befcb0f71" />  

## 🔧 Running the Project Locally
Clone the repo:
```
git clone https://github.com/jonni-saarelainen/arbitrage-finder.git
```
Install backend and frontend node packages with:
```
npm i
```
Create a **.env** file in the backend directory:
```
PORT=5000
ODDS_API_KEY=
```
Start the backend server with:
```
node server.js
```
Start frontend with:
```
npm run dev
```

## 📌 Notes & Limitations
- The app is designed for educational purposes and only for running locally
- Performance depends on Odds API response times and is heavily rate limited
- Only bookmakers with websites accessible in the Finnish region are included.
- Dates and currency are formatted according to Finnish conventions.
