import { pool } from "../config/db.js";

export const requireUser = async (req, res, next) => {
  try {
    console.log("🔐 Auth check for:", req.method, req.url);
    
    // Ambil user_id dari berbagai sumber berdasarkan method
    let userId;
    
    if (req.method === 'GET') {
      // Untuk GET, ambil dari query parameters
      userId = req.query.user_id;
    } else if (req.method === 'DELETE') {
      // Untuk DELETE, ambil dari body 
      userId = req.body.user_id;
    } else {
      // Untuk POST, PUT, ambil dari body
      userId = req.body.user_id;
    }
    
    console.log("📋 Extracted user_id:", userId);
    console.log("📦 Request body:", req.body);
    console.log("❓ Request query:", req.query);

    if (!userId) {
      return res.status(400).json({ 
        message: "user_id diperlukan" 
      });
    }

    const [rows] = await pool.query("SELECT id, role FROM users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    if (rows[0].role !== "user") {
      return res.status(403).json({ message: "Hanya user yang diizinkan" });
    }

    req.currentUser = rows[0];
    console.log("✅ Auth success for user:", rows[0].id);
    next();
  } catch (err) {
    console.error("❌ Auth middleware error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Cek admin
export const requireAdmin = async (req, res, next) => {
  try {
    console.log("🔐 Admin auth check for:", req.method, req.url);
    
    // Ambil user_id dari berbagai sumber berdasarkan method
    let userId;
    
    if (req.method === 'GET') {
      userId = req.query.user_id;
    } else if (req.method === 'DELETE') {
      userId = req.body.user_id;
    } else {
      userId = req.body.user_id;
    }

    if (!userId) {
      return res.status(400).json({ message: "user_id diperlukan" });
    }

    const [rows] = await pool.query("SELECT id, role FROM users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    if (rows[0].role !== "admin") {
      return res.status(403).json({ message: "Hanya admin yang diizinkan" });
    }

    req.currentUser = rows[0];
    console.log("✅ Admin auth success for user:", rows[0].id);
    next();
  } catch (err) {
    console.error("❌ Admin auth middleware error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};