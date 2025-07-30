# 📝 Blog Post API

A simple RESTful API for a blog system built with Node.js, Express, and MongoDB. It includes user registration with hashed passwords, JWT-based authentication, protected routes, and basic CRUD for blog posts.

## 📁 Project Structure

```
blog-post/
│
├── config/              # DB configuration
│   └── configDB.js
│
├── controllers/         # Request handlers
│   ├── posts.js
│   └── register.js
│
├── middleware/          # Custom middleware
│   ├── errorHandler.js
│   ├── roles.js
│   └── verifyJwt.js
│
├── models/              # Mongoose schemas
│   ├── postsSchema.js
│   └── user.js
│
├── routes/              # API routes
│   ├── posts.js
│   └── register.js
│
├── utils/               # Utility functions
│   └── hashPassword.js
│
├── server.js            # Entry point
├── package.json
├── vercel.json          # Deployment config (for Vercel)
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB instance (local or cloud)
* Vercel account (optional, for deployment)

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 📦 Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm start`     | Starts the server          |
| `npm run dev`   | Starts server with nodemon |
| `npm run build` | Placeholder build script   |

---

## 🔐 Auth & Roles

* User registration saves hashed passwords using `bcryptjs`.
* JWT is issued on login and verified in protected routes via middleware.
* Role-based access setup is included (see `roles.js`).

---

## 🛠 Features

* Register and authenticate users
* Create, read, update, delete blog posts
* JWT-protected routes
* Error handling middleware
* Password hashing
* File upload support (`multer`)

---

## 🛣 API Routes

| Route        | Method | Access        | Description         |
| ------------ | ------ | ------------- | ------------------- |
| `/register`  | POST   | Public        | Register a new user |
| `/posts`     | GET    | Public        | Get all posts       |
| `/posts/:id` | GET    | Public        | Get a specific post |
| `/posts`     | POST   | Authenticated | Create a new post   |
| `/posts/:id` | PUT    | Authenticated | Update a post       |
| `/posts/:id` | DELETE | Authenticated | Delete a post       |

---

## 📤 Deployment

This project includes a `vercel.json` for quick deployment on [Vercel](https://vercel.com/).

```bash
vercel login
vercel
```

Make sure to add your environment variables in the Vercel dashboard.

---

## 🧪 To Do

* Add login route
* Add user profile endpoints
* Add pagination and search
* Write tests

---

## 📚 Tech Stack

* **Node.js** + **Express** – Backend framework
* **MongoDB** + **Mongoose** – Database
* **JWT** – Authentication
* **Bcryptjs** – Password hashing
* **Multer** – File uploads
* **Morgan** – Logger
* **Cookie-Parser**, **CORS**, etc.

---

## 🧑‍💻 Author

Your Name — [@yourhandle](https://github.com/yourhandle)

---

Let me know if you want badges, sample API requests, or Postman collection links added too.
