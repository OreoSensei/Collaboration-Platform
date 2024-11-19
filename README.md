# Collaborative Document Editing Platform

A full-stack web application enabling real-time collaborative document editing, combining powerful features with a user-friendly interface. This platform allows multiple users to create, edit, and collaborate on documents simultaneously, enhancing productivity and teamwork.

---

## Features

- **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
- **Real-Time Collaboration:** Multiple users can edit documents simultaneously with changes reflected in real-time using Socket.io.
- **Document Management:** Create, read, update, and delete documents with an intuitive interface.
- **Rich Text Editing:** Feature-rich text editor for formatting documents.
- **User Profiles:** Users can view and update their profiles.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Security:** Protected routes and data encryption to ensure user data safety.
- **Scalable Architecture:** Built with scalability and maintainability in mind.

---

## Technologies Used

### Frontend

- **React.js:** JavaScript library for building user interfaces.
- **Redux:** State management for predictable state changes.
- **Axios:** Promise-based HTTP client for the browser.
- **Socket.io Client:** Real-time bidirectional event-based communication.
- **React Router:** Declarative routing for React applications.
- **Quill.js or Draft.js:** Rich text editor library for document editing.
- **ES6+:** Modern JavaScript features for cleaner and more efficient code.

### Backend

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for scalable data storage.
- **Mongoose:** MongoDB object modeling tool for Node.js.
- **Socket.io:** Enables real-time, bidirectional communication between web clients and servers.
- **JWT:** Secure token-based authentication.
- **bcrypt.js:** Library for hashing passwords.
- **Cors:** Middleware for enabling Cross-Origin Resource Sharing.
- **Dotenv:** Module to load environment variables from a `.env` file.

---

## Architecture Overview

The application follows a **Model-View-Controller (MVC)** architecture and is divided into two main folders:

- **Client:** Contains the React frontend code.
- **Server:** Contains the Node.js backend code.

---

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or MongoDB Atlas account)
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/collaborative-document-editor.git
   cd collaborative-document-editor
   ```

2. **Install dependencies for the server:**

   ```bash
   cd server
   npm install
   ```

3. **Install dependencies for the client:**

   ```bash
   cd ../client
   npm install
   ```

### Environment Variables

Create `.env` files in both the `server` and `client` directories.

#### Server (`server/.env`):

```env
# MongoDB connection URI
MONGO_URI=mongodb://localhost:27017/collaboration_platform

# JWT secret key for token signing
JWT_SECRET=your_jwt_secret_key

# Frontend URL for CORS configuration
FRONTEND_URL=http://localhost:3000

# Port number for the backend server
PORT=5000
```

- Replace `your_jwt_secret_key` with a secure random string.

#### Client (`client/.env`):

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api

# Socket.io server URL
REACT_APP_SOCKET_IO_URL=http://localhost:5000
```

### Running the Application

#### Start the Backend Server

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Start the server:**

   ```bash
   npm run server
   ```

   - The server should start on `http://localhost:5000`.

#### Start the Frontend Application

1. **Navigate to the client directory:**

   ```bash
   cd ../client
   ```

2. **Start the client application:**

   ```bash
   npm start
   ```

   - The application should open in your default browser at `http://localhost:3000`.

---

## Usage

1. **Register a New Account:**

   - Click on the **Sign Up** button.
   - Fill in the registration form and submit.

2. **Login:**

   - Use your credentials to log in.

3. **Create a New Document:**

   - Navigate to the **Dashboard**.
   - Click on **Create New Document**.
   - Enter a title for your document.

4. **Edit a Document:**

   - Click on a document from your list.
   - Use the rich text editor to make changes.
   - Changes are saved in real-time and visible to collaborators.

5. **Collaborate in Real-Time:**

   - Share the document link with other registered users.
   - Collaborators can edit the document simultaneously.

6. **Update Profile:**

   - Go to **Profile Settings**.
   - Update your information and save changes.

---

## Project Structure

```
collaborative-document-editor/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── store/
│       ├── utils/
│       └── App.js
├── server/                 # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── README.md
└── package.json
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

- **POST `/register`**: Register a new user.
- **POST `/login`**: Authenticate a user and return a token.
- **GET `/user`**: Get the authenticated user's information.

### User Routes (`/api/users`)

- **GET `/profile`**: Get the user's profile.
- **PUT `/profile`**: Update the user's profile.

### Document Routes (`/api/documents`)

- **GET `/`**: Get all documents for the authenticated user.
- **POST `/`**: Create a new document.
- **GET `/:id`**: Get a specific document.
- **PUT `/:id`**: Update a document.
- **DELETE `/:id`**: Delete a document.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch** for your feature or bug fix.

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes** with clear messages.

   ```bash
   git commit -m "Add new feature: description"
   ```

4. **Push to the branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** explaining your changes.

---

Feel free to contact me if you have any questions or suggestions!

---

Thank you for checking out this project! I hope you find it impressive and reflective of my skills and dedication to building robust and user-friendly applications.