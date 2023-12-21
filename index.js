const express = require("express");
const { log } = require("console");
const { Client } = require("pg");
require("dotenv").config();

const app = express();
const port = 3000;
const client = new Client(process.env.DATABASE_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

client.connect();

app.get("/", async (req, res) => {
  if (req.query.err) {
    res.render("index.ejs", { error: true });
  } else {
    res.render("index.ejs", { error: false });
  }
});

app.post("/stock", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Assuming the password column is named 'password' in your database
      if (password === user.password) {
        res.render("stock.ejs", { name: username });
      } else {
        res.redirect("/?err=true");
      }
    } else {
      res.redirect("/?err=true");
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.redirect("/?err=true");
  }
});

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
});
