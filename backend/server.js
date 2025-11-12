import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log("database connected successfully");
    connection.release();

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("database connection failed:", error);
  }
}

startServer();
