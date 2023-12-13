import express from "express";
import mysql from "mysql2";
import cors from "cors";
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(cors());

// create the connection to database
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (error, data) => {
    if (error) {
      return res.json({ error: error });
    }
    return res.json(data);
  });
});

app.listen(4500, () => {
  console.log("Running");
});
