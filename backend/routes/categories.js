import { Router } from "express";
import { pool } from "../db.js";

console.log("[categories] router file loaded"); 

const router = Router();

router.get("/categories", async (req, res) => {
  console.log("[categories] GET /categories hit");
  try {
    const [rows] = await pool.query(
      "select category_id, name from categories order by name"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

export default router;
