# Authentication Documentation

## Overview

This application uses a simple SQLite-based authentication system with JWT tokens for session management. The backend is built with Express.js and the frontend uses React with Context API for state management.

## Architecture

### Backend Structure

```
server/
├── db.js          # SQLite database setup and schema
├── auth.js        # Authentication logic (JWT, bcrypt)
├── server.js      # Express server and API routes
└── seed.js        # Database seeding script
```

### Frontend Structure

```
src/
├── contexts/
│   └── AuthContext.tsx    # Auth context provider and hooks
└── pages/
    └── Login.tsx          # Login page component
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- `idx_username` on `username`
- `idx_email` on `email`

## Setup Instructions

### 1. Install Dependencies

All required dependencies are already installed:
- `express` - Web server
- `better-sqlite3` - SQLite database
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT token generation
- `cors` - CORS middleware

### 2. Seed Default User

Run the seed script to create a default admin user:

```bash
npm run seed
```

**Default Credentials:**
- Username: `admin`
- Email: `admin@force-divided.com`
- Password: `admin123`

⚠️ **Important:** Change the default password in production!

### 3. Start the Backend Server

```bash
npm run dev:server
```

The server will start on `http://localhost:3001` by default.

### 4. Start the Frontend

In a separate terminal:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default).

## API Endpoints

### Base URL

```
http://localhost:3001/api
```

### Endpoints

#### `POST /api/auth/register`

Register a new user.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "username": "string",
    "email": "string"
  }
}
```

**Errors:**
- `400` - Missing fields or password too short (< 6 characters)
- `400` - Username or email already exists

#### `POST /api/auth/login`

Login with username/email and password.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "username": "string",
    "email": "string"
  }
}
```

**Errors:**
- `400` - Missing username or password
- `401` - Invalid credentials

#### `GET /api/auth/me`

Get current authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "string",
    "email": "string",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**
- `401` - No token provided or invalid token
- `404` - User not found

## Frontend Usage

### Auth Context

The `AuthContext` provides authentication state and methods throughout the app.

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, token, login, register, logout, isLoading } = useAuth();
  
  // user: User | null - Current user object
  // token: string | null - JWT token
  // login(username, password) - Login function
  // register(username, email, password) - Register function
  // logout() - Logout function
  // isLoading: boolean - Loading state
}
```

### Login Page

Navigate to `/login` to access the login page. The page displays default credentials for development.

### Protected Routes

To protect a route, check the `user` state:

```tsx
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedComponent() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return <div>Protected Content</div>;
}
```

## Security Considerations

### Current Implementation

- ✅ Passwords are hashed using bcrypt (10 salt rounds)
- ✅ JWT tokens expire after 7 days
- ✅ SQL injection protection via prepared statements
- ✅ CORS enabled for frontend origin

### Production Recommendations

1. **Change JWT Secret**: Set `JWT_SECRET` environment variable to a strong, random string
2. **HTTPS**: Always use HTTPS in production
3. **Password Policy**: Implement stronger password requirements
4. **Rate Limiting**: Add rate limiting to prevent brute force attacks
5. **Token Refresh**: Implement token refresh mechanism
6. **Input Validation**: Add more comprehensive input validation
7. **Environment Variables**: Use `.env` file for sensitive configuration

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
JWT_SECRET=your-super-secret-key-change-this
FRONTEND_URL=http://localhost:5173
```

## Database Location

The SQLite database is created at:
```
server/database.sqlite
```

This file is automatically created on first run and is excluded from git via `.gitignore`.

## Troubleshooting

### Database Locked Error

If you see "database is locked" errors:
- Make sure only one instance of the server is running
- Close any database viewers that might have the file open

### Token Not Working

- Check that the token is being sent in the `Authorization` header
- Verify the token hasn't expired (7 days)
- Ensure `JWT_SECRET` matches between token creation and verification

### User Not Found After Login

- Verify the database was seeded: `npm run seed`
- Check that the user exists in the database
- Ensure the database file exists at `server/database.sqlite`

## Future Enhancements

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Social login (OAuth)
- [ ] Two-factor authentication
- [ ] Session management (multiple devices)
- [ ] User roles and permissions
- [ ] Account deletion
- [ ] Profile picture upload

