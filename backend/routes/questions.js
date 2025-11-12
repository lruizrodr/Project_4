import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/questions", async (req, res) => {
  const { category_id } = req.query;
  if (!category_id)
    return res.status(400).json({ message: "category_id required" });

  try {
    const [rows] = await pool.query(
      `select q.question_id, q.title, q.body, q.created_at, u.username
       from questions q
       join users u on u.user_id = q.user_id
       where q.category_id=?
       order by q.created_at desc`,
      [category_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});

export default router;
