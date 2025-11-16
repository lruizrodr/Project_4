import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/answers", async (req, res) => {
  const { question_id } = req.query;

  if (!question_id)
    return res.status(400).json({ message: "question_id required" });

  try {
    const [rows] = await pool.query(
      `select a.answer_id, a.body, a.created_at, u.username
       from answers a
       join users u on a.user_id = u.user_id
       where a.question_id = ?
       order by a.created_at asc`,
      [question_id]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

export default router;
