import db from "./db.js";
import bcrypt from "bcrypt";

// Default user credentials
const defaultUser = {
  username: "admin",
  email: "admin@force-divided.com",
  password: "admin123", // In production, use a strong password
};

async function seed() {
  try {
    // Check if default user already exists
    const existingUser = db
      .prepare("SELECT * FROM users WHERE username = ? OR email = ?")
      .get(defaultUser.username, defaultUser.email);

    if (existingUser) {
      console.log("Default user already exists. Skipping seed.");
      return;
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(defaultUser.password, saltRounds);

    // Insert default user
    const insertUser = db.prepare(`
      INSERT INTO users (username, email, password_hash)
      VALUES (?, ?, ?)
    `);

    insertUser.run(defaultUser.username, defaultUser.email, passwordHash);

    console.log("✅ Default user seeded successfully!");
    console.log(`   Username: ${defaultUser.username}`);
    console.log(`   Email: ${defaultUser.email}`);
    console.log(`   Password: ${defaultUser.password}`);
    console.log("\n⚠️  Remember to change the default password in production!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed().then(() => {
  process.exit(0);
});
