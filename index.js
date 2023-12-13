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

// Get list of records
app.get("/", (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (error, data) => {
    if (error) {
      return res.json({ error: error });
    }
    return res.json(data);
  });
});

// Create records
app.post("/create", (request, response) => {
  try {
    const sql = "INSERT INTO book(publisher,name,date) VALUE (?)";
    const values = [
      request.body.publisher,
      request.body.name,
      request.body.date,
    ];
    db.query(sql, [values], (err, data) => {
      if (err) {
        return response.send({ message: err });
      }
      return response.status(201).send({ status: 201, data: data });
    });
  } catch (error) {
    console.log("Error create --> ", error);
    return response.send({ message: error });
  }
});

// Delete record from book table
app.delete("/delete/:id", (request, response) => {
  try {
    const sql = "DELETE FROM book WHERE id = ?";
    const values = [request.params.id];
    db.query(sql, values, (error, data) => {
      if (error) {
        return response.send({ message: error });
      }
      return response.status(200).send({ status: 200, data: data });
    });
  } catch (error) {
    console.log("Error delete --> ", error);
    return response.json({ errorMessage: error });
  }
});

app.listen(4500, () => {
  console.log("Running");
});
