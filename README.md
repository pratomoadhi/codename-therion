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
2. Copy and modify backend .env:
   ```sh
   cd backend  
   cp .env.example .env
   ```
3. Start the backend:  
   ```sh
   npm install  
   npm run start:dev
   ```
4. Copy and modify backend .env:
   ```sh
   cd ../frontend  
   cp .env.local.example .env.local
   ```
5. Start the frontend:  
   ```sh
   npm install  
   npm run dev  
   ```
6. Open the app at `http://localhost:3001`.  

## 🐳 Docker Setup

Make sure Docker and Docker Compose are installed.

Build the containers:
   ```sh
   docker-compose build
   ```

Start the app:
   ```sh
   docker-compose up -d
   ```

Open the frontend at http://localhost:8080 and the backend API at http://localhost:8000.

Note: SQLite is used by default. You can configure PostgreSQL for production by updating environment variables and the database config.

## 📄 License

This project is licensed under the MIT License.

