import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import "dotenv/config";
import { log } from "console";

const app = express();
const port = 3000;

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.SSL_CA,
  },
};

const db = new pg.Client(config);

const client = new pg.Client(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    // Query to select all rows from the 'users' table
    const queryText = "SELECT * FROM users";

    // Execute the query
    const result = await db.query(queryText);

    // Check if rows are returned
    if (result && result.rows && result.rows.length > 0) {
      // Log the first row for demonstration (remove this in production)
      console.log(result.rows[0]);

      // Send the rows as a response (you can format the response as needed)
      res.json(result.rows);
    } else {
      // Handle case when no rows are returned
      console.log("No rows found");
      res.send("<h1>No Data</h1>");
    }
  } catch (error) {
    // Handle any errors that occur during the query execution
    console.error("Error executing the query:", error);
    res.status(500).send("Internal Server Error");
  }

  client.end();
});

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
});
