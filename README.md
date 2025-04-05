# 📸 Media Manager & Gallery  

A **full-stack web application** built with **Next.js (frontend)** and **Nest.js (backend)**, using **SQLite** for development. This app allows users to **upload, manage, and explore media files** in an intuitive gallery.  

## 🚀 Features  
- 📂 **Media Upload & Management** – Organize your media effortlessly.  
- 🎮 **Gallery View** – Browse uploaded media in a clean, responsive layout.  
- 🔍 **Search & Filter** – Find media files quickly.  
- 🛠 **API-powered Backend** – Built with Nest.js for scalability.  

## 🏗️ Tech Stack  
- **Frontend:** Next.js  
- **Backend:** Nest.js  
- **Database:** SQLite (for development), PostgreSQL (for production)  
- **Containerization:** Docker  

## 🔧 Setup  
1. Clone the repo:  
   ```sh
   git clone https://github.com/pratomoadhi/codename-therion.git
   cd codename-therion
   ```
2. Start the backend:  
   ```sh
   cd backend  
   npm install  
   npm run start  
   ```
3. Start the frontend:  
   ```sh
   cd ../frontend  
   npm install  
   npm run dev  
   ```
4. Open the app at `http://localhost:3001`.  

🚧 Docker Setup

Make sure Docker and Docker Compose are installed.

Build the containers:

docker-compose build

Start the app:

docker-compose up -d

Open the frontend at http://localhost:3030 and the backend API at http://localhost:3000.

Note: SQLite is used by default. You can configure PostgreSQL for production by updating environment variables and the database config.

🐜 License

MIT License.

