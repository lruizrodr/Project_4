import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/categories", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "select category_id, name from categories order by name"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});

export default router;
