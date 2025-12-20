import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "./db.js";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

// Generate JWT token
export function generateToken(userId, username) {
  return jwt.sign({ userId, username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Register a new user
export async function registerUser(username, email, password) {
  // Check if user already exists
  const existingUser = db
    .prepare("SELECT * FROM users WHERE username = ? OR email = ?")
    .get(username, email);

  if (existingUser) {
    throw new Error("Username or email already exists");
  }

  // Hash password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Insert user
  const insertUser = db.prepare(`
    INSERT INTO users (username, email, password_hash)
    VALUES (?, ?, ?)
  `);

  const result = insertUser.run(username, email, passwordHash);

  return {
    id: result.lastInsertRowid,
    username,
    email,
  };
}

// Login user
export async function loginUser(username, password) {
  // Find user by username or email
  const user = db
    .prepare("SELECT * FROM users WHERE username = ? OR email = ?")
    .get(username, username);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  // Generate token
  const token = generateToken(user.id, user.username);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
}

// Get user by ID
export function getUserById(userId) {
  const user = db
    .prepare("SELECT id, username, email, created_at FROM users WHERE id = ?")
    .get(userId);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.created_at,
  };
}
