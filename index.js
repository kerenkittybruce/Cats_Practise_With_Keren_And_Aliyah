// API WITH ALIYAH AND KEREN

// EXPRESS . JS

const express = require("express");
const path = require("path");
const db = require("./config");
const bdyParser = require("body-parser");
const cors = require('cors');
const port = parseInt(process.env.port) || 3000;

// EXPRESS APP

const app = express();

// ROUTER

const route = express.Router();
app.use(route, express.json, bdyParser.urlencoded({ extended: false }));

// HOME or "/" --- NB

route.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "./views/index.html"));
});

// LOGIN

route.patch("/login", bdyParser.json(), (req, res) => {
  const { Cat_Name, Password } = req.body;
  const strQry = `
    SELECT Cat_Name, Age, Password
    FROM cats
    WHERE Cat_Name = '${Cat_Name}';
    `;

  db.query(strQry, (err, data) => {
    if (err) throw err;
    if (!data.length || data == null) {
      res.status(401).json({ err: "You are not on our database, Kitty ." });
    } else {
      let { Cat_Name } = data[0];
      if (Password === data[0].Password) {
        res
          .status(200)
          .json({ msg: `Hey, it's great to see you again, ${Cat_Name}!` });
      } else {
        res
          .status(200)
          .json({ err: `You have entered an incorrect Password .` });
      }
    }
  });
});

// GET -- TO RETRIEVE

route.get("/users", (req, res) => {
  const strQry = `
    SELECT Cat_Name, Age, Password
    FROM cats;
    `;

  db.query(strQry, (err, data) => {
    if (err) throw err;
    res.status(200).json({ result: data });
  });
});

//  PUT --- TO UPDATE

route.put("/users/:catID", bdyParser.json(), (req, res) => {
  let data = req.body;
  console.log(data);
  const strQry = `
    UPDATE cats
    SET ?
    WHERE catID = ?;
    `;

  db.query(strQry, [data, req.params.catID], (err) => {
    if (err) throw err;
    res.status(200).json({ msg: "Your info has been updated, meow!" });
  });
});

// POST --- TO REGISTER

route.post("/register", bdyParser.json(), (req, res) => {
  let details = req.body;
  console.log(details);

  //  SQL

  const strQry = `
    INSERT INTO cats
    SET ?;
    `;

  db.query(strQry,[details], (err) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res
        .status(200)
        .json({ msg: "You have been successfully registered , Kitty!" });
    }
  });
});


//  DELETE --- TO DELETE

route.delete("/users/:catID", (req, res) => {
  const strQry = `
    DELETE FROM cats
    WHERE catID = ?;
    `;

  db.query(strQry, [req.params.catID], (err) => {
    if (err) throw err;
    res.status(200).json({ msg: "You have been deleted from our database ." });
  });
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });