# Lost & Found Item Management System – Backend

Backend API for the **Lost & Found Item Management System** built using **Node.js, Express.js, MongoDB, and JWT Authentication**.

This backend handles:
- User Authentication
- Item Management APIs
- JWT Authorization
- MongoDB Database Operations

---

## 🚀 Live Deployment

🔗 Backend Live URL:  
https://lost-and-found-47nb.onrender.com

---

## 📌 Features

### Authentication
- User Registration
- User Login
- JWT Token Generation
- Password Hashing using bcrypt

### Item Management
- Add Lost/Found Items
- View All Items
- View Item by ID
- Update Item
- Delete Item
- Search Items by Name

### Security
- Protected Routes
- JWT Authentication Middleware
- Hashed Password Storage

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors

---

## 📂 Project Structure

```bash
config/
│
├── db.js

controllers/
│
├── authController.js
└── itemController.js

middleware/
│
└── authMiddleware.js

models/
│
├── Item.js
└── User.js

routes/
│
├── auth.js
└── items.js

utils/
│
└── generateToken.js

Root Files:
│
├── server.js
├── package.json
├── package-lock.json
└── .gitignore
