# 🌍 REST Countries React App

A modern React application that allows users to explore countries around the world using the REST Countries API. Features include searching, filtering, favoriting countries, and viewing details — with user authentication and a favorites management system.

---

## 📦 Tech Stack

* **Frontend:** React, Tailwind CSS, Axios, React Router
* **Backend:** Node.js, Express, MongoDB, Mongoose
* **Authentication:** JWT-based token authentication
* **Testing:** Jest
* **Utilities:** react-hot-toast for notifications, react-icons

---

## 📑 Features

* Search for countries by name
* Filter countries by region or language
* View detailed country information
* User registration and login
* Favorite/unfavorite countries
* View and manage your favorites
* Protected routes with token-based authentication
* Toast notifications for feedback

---

## 🛠️ Application Setup

### 📥 Clone the Repository

```bash
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-dhiyanahL
cd your-repo-name
```

### 🔧 Install Dependencies

For both frontend and backend:

```bash
# Frontend
cd client/frontend
npm install

# Backend
cd ../server
npm install
```

---

## 🚀 Build and Run Process

### 📌 Run Backend Server

```bash
cd server
npm run dev
```

Server runs on [http://localhost:5000](http://localhost:5000)

---

### 📌 Run Frontend React App

```bash
cd client/frontend
npm start
```

React app runs on [http://localhost:5173](http://localhost:5173)

---

## 🚀 Running the Tests

```bash
cd client/frontend
npm test
```

## 🌐 Live Demo

👉 [CountryHop Frontend](https://country-hop.netlify.app)



## 🎨 Customization

* Tailwind config located in `client/frontend/tailwind.config.js`
* Custom color palette applied across components



## 📖 API Endpoints

**Backend**

| Method | Route                  | Description                     |
| :----- | :--------------------- | :------------------------------ |
| POST   | `/api/auth/register`   | Register new user               |
| POST   | `/api/auth/login`      | User login                      |
| POST   | `/api/favorites/add`      | Add country to favorites        |
| GET    | `/api/favorites/`      | Get all user's favorites        |
| DELETE | `/api/favorites/:code` | Remove a country from favorites |

---

## ✨ Usage Instructions

1. Register or login to access full functionality
2. Browse countries, search by name, or filter by region/language
3. Click on a country card to view details
4. Use the heart icon to add/remove favorites
5. Manage your favorites from the 'Favorites' page

---