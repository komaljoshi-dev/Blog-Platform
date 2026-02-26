# Blog-Platform
## MERN Stack Application

A full-stack blog platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, post creation, editing, and deletion.

-------

## Features

1. User Authentication
- User registration with validation
- Secure login with JWT tokens
- Password hashing using bcrypt
- Persistent login state using localStorage
- Protected routes for authenticated users

2. Post Management
- Create new blog posts
- View all posts (public)
- View single post details
- Edit your own posts
- Delete your own posts
- View user-specific posts in profile

3. User Interface
- Responsive design for all devices
- Modern, clean green-themed UI
- Loading states and animations
- Toast notifications for user feedback
- Protected route handling

-------- 

## Tech Stack

### Backend
- Node.js - Runtime environment
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM for MongoDB
- JWT - Authentication
- bcryptjs - Password hashing

### Frontend
- React - UI library
- React Router DOM - Routing
- Axios - HTTP client
- Context API - State management
- React Toastify - Notifications

---------

## Project Structure
```
Blog-Platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── App.js
│
├── .gitignore
└── README.md
```
----------

## Installation

1. Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm 

2. Backend Setup
- Navigate to backend directory:
```cd backend```
- Install dependencies:
```npm install```
- Create .env file in backend directory:
```PORT=5000```
```MONGO_URI=your_mongodb_connection_string```
```JWT_SECRET=your_jwt_secret_key```
- Start the server:
```npm start```

3. Frontend Setup
- Navigate to frontend directory:
```cd frontend```
- Install dependencies:
```npm install```
- Start the React app:
```npm start```

The app will open at http://localhost:3000

----------

## API Documentation

1. Authentication Routes (/api/auth)

| Method | Endpoint  | Description       | Auth Required |
|--------|-----------|-------------------|---------------|
| POST   | /register | register new user | No            |
| POST   | /login    | login user        | No            |
| GET    | /me       | get current user  | Yes           |

2. Post Routes (/api/posts)

| Method | Endpoint      | Description      | Auth Required |
|--------|---------------|------------------|---------------|
| GET    | /             | Get all posts    | No            |
| GET    | /:id          | Get single post  | No            |
| POST   | /             | Create new post  | Yes           |
| PUT    | /:id          | Update post      | Yes           |
| DELETE | /:id          | Delete post      | Yes           |
| GET    | /user/profile | Get user's posts | Yes           |

-------

## Features in Detail
1. Authentication Flow
- User registers with username, email, and password
- Password is hashed using bcrypt before storage
- On login, JWT token is generated and sent to client
- Token stored in localStorage for persistent login
- Token automatically attached to all API requests via Axios interceptor

2. Authorization
- Protected routes check for valid JWT token
- Post ownership verified before edit/delete operations
- Users can only modify their own posts

3. State Management
- AuthContext manages user state globally
- Token persistence across page refreshes
- Automatic logout on token expiration

4. UI/UX Features
- Responsive design for mobile and desktop
- Loading spinners during async operations
- Toast notifications for user feedback
- Form validation on client and server side
- Protected route redirection

--------

##### Author: Komal Joshi
##### GitHub: @komaljoshi-dev

Thankyou:)