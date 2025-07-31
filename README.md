# ✅ Toufique Todo App – Full Stack (MERN) with JWT Authentication

This is a full-stack **Todo App** built with the **MERN stack** (MongoDB, Express, React, Node.js) featuring **User Registration**, **Login**, and **JWT-based authentication**. Each user has their own tasks, securely managed via JSON Web Tokens.

---

## 🔧 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (JSON Web Tokens)  
- **HTTP:** Axios  

---

## 🧩 Features

- **👤 User Authentication**  
  - User registration with email and password  
  - Login with credentials to receive JWT access token  
  - Tokens stored securely in localStorage  
  - Authenticated routes protect user data  

- **🔒 Secure Task Management**  
  - Each user only accesses their own tasks  
  - Backend verifies JWT on all protected endpoints  

- **📝 Task CRUD per User**  
  - Add, edit, delete, and view user-specific tasks  

- **🎰 Spin to Pick a Task**  
  - Spin wheel selects random incomplete tasks for the logged-in user  

---

## ⚙️ Authentication Flow

1. **Register**  
   POST `/api/auth/register` with `{ name, email, password }` to create a new user.  
   Passwords are hashed before saving.

2. **Login**  
   POST `/api/auth/login` with `{ email, password }` to authenticate.  
   Returns a JWT token on success.

3. **Protected API Calls**  
   Client sends JWT token in `Authorization: Bearer <token>` header.  
   Backend middleware verifies token and grants access.

---

## 📂 Folder Structure

```plaintext
root/
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   └── db.js
│   ├── app.js
│   ├── index.js
│   ├── server.js
│   ├── vercel.json
│   ├── .env
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api.js
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SpinSection.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskDetails.jsx
│   │   │   │── StatusColor.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │       
│   ├── .env
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── README.md
└── package.json
```

## 🌐 API Endpoints

### Public

- `POST /api/auth/register` – Register new user  
- `POST /api/auth/login` – User login, returns JWT token  

### Protected (require JWT)

- `GET /api/tasks` – Get logged-in user’s tasks  
- `POST /api/tasks` – Add new task  
- `PUT /api/tasks/` – Update task  
- `DELETE /api/tasks/:id` – Delete task  

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```
### 2. Install dependencies
```bash
npm install
```
### 3. Configure environment variables

Create a .env file in the backend root with:
```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```
### 4. Run backend server
```bash
npm run dev
```
### 5. Configure frontend .env
```ini
VITE_API_BASE_URL=http://localhost:5000
```
### 6. Run frontend
```bash
npm run dev
```

## 🧪 Usage

- Register a new user on the frontend  
- Login to receive JWT stored in localStorage  
- Access task dashboard, where tasks belong only to the logged-in user  
- Use the spin feature to randomly pick tasks from incomplete tasks  
- Logout clears JWT and user data  

---

## 🛡️ Security Notes

- Passwords hashed with bcrypt before storage  
- JWT tokens signed with strong secret  
- Protected routes verify JWT on every request  
- Tokens expire after set duration (default 1 day)  

---

## 📧 Contact

- GitHub: mdtoufique  
- Email: mdrehmant@email.com
