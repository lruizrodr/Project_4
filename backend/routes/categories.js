import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/categories", async (req, res) => {
  const [rows] = await pool.query(
    "select category_id, name from categories order by name"
  );
  res.json(rows);
});

export default router;
