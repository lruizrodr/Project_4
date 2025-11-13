import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../db.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "username and password required" });

  const [exists] = await pool.query(
    "select user_id from users where username=?",
    [username]
  );
  if (exists.length)
    return res.status(409).json({ message: "username already taken" });

  const hash = await bcrypt.hash(password, 10);
  await pool.query("insert into users (username, password_hash) values (?, ?)", [
    username,
    hash
  ]);

  res.status(201).json({ message: "user created" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await pool.query(
    "select user_id, password_hash from users where username=?",
    [username]
  );

  if (!rows.length)
    return res.status(401).json({ message: "invalid username or password" });

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid)
    return res.status(401).json({ message: "invalid username or password" });

  res.json({ message: "login success", user_id: user.user_id });
});

export default router;
