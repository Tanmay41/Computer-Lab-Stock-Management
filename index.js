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
      if (password === user.password) {
        const stock = await client.query("SELECT * FROM stock;");
        res.render("stock.ejs", { name: username, data: stock });
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

app.post("/stock/add", (req, res) => {
  const { itemName, itemQuantity } = req.body;
  client.query(
    `INSERT INTO stock(item_name, quantity) VALUES('${itemName}', ${itemQuantity});`
  );
  res.redirect("/");
});

app.post("/stock/edit/:id", async (req, res) => {
  console.log(req.body);
  const { itemName, itemQuantity } = req.body;
  const rowId = req.params.id;
  const result = await client.query(
    `UPDATE stock SET item_name = '${itemName}', quantity = ${itemQuantity} WHERE id = ${rowId};`
  );
  res.redirect("/");
});

app.post("/stock/delete/:id", (req, res) => {
  const id = req.params.id;
  client.query(`DELETE FROM stock WHERE id = ${id};`).then(() => {
    res.redirect("/");
  });
});

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
});
