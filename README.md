# 🧩 TaskFlow

TaskFlow is a full-stack, authenticated project and task management application built using FastAPI, PostgreSQL, and React. The application supports secure user authentication, user-scoped data access, and complete CRUD functionality for managing projects and tasks.

## 🚀 Live Demo

- **Frontend:** https://taskflow-beta-eight.vercel.app  
- **Backend API (Swagger):** https://taskflow-backend-heyj.onrender.com/docs

---

## ✨ Features

### 🔐 Authentication & Security
- User registration and login using email and password
- Secure password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- User-scoped data access (users can only see their own projects and tasks)

### 📁 Project Management
- Create, view, update, and delete projects
- Projects are owned by individual users
- Projects contain multiple tasks

### ✅ Task Management
- Create tasks under projects
- Update task details
- Mark tasks as complete or incomplete
- Task ownership enforced through project ownership

### 🖥️ Frontend
- Built with React and Vite
- Client-side routing with React Router
- Protected routes for authenticated users
- Clean, responsive UI
- Axios interceptor for automatic authentication headers

---

## 🏗️ Tech Stack

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- Pydantic v2
- JWT (python-jose)
- Passlib (bcrypt)

### Frontend
- React
- Vite
- Axios
- React Router

### Deployment
- Backend and database hosted on Render
- Frontend deployed on Vercel

---

## 📂 Project Structure

taskflow/
├── backend/
│ ├── app/
│ │ ├── routers/ # API routes (auth, users, projects, tasks)
│ │ ├── models.py # Database models
│ │ ├── schemas.py # Request/response schemas
│ │ ├── crud.py # Business logic
│ │ ├── auth.py # JWT & password hashing
│ │ └── main.py # FastAPI app entry
│ └── requirements.txt
│
└── client/
├── src/
│ ├── pages/ # App pages (Login, Projects, Tasks)
│ ├── components/ # Reusable UI components
│ ├── api/ # Axios API client
│ └── auth/ # Frontend auth helpers
└── package.json
