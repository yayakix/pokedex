const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const pokemon = require("./models/pokemon");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// standard installs

app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/pokemon", (req, res) => {
  res.render("index.ejs", { pokemon: pokemon });
});

app.get("/pokemon/:id", (req, res) => {
  res.render("show.ejs", { pokemon: pokemon[req.params.id] });
});
// shows individual pokemon stat pages

app.get("/pokemon/:id/edit", (req, res) => {
  let stat = pokemon[req.params.id].stats;

  var strBuilder = [];
  for (key in stat) {
    if (stat.hasOwnProperty(key)) {
      strBuilder.push(key + ": " + stat[key]);
    }
  }
  //   convert obj to array and then to string
  console.log(strBuilder);
  stat = strBuilder;

  res.render("edit.ejs", {
    pokemon: pokemon[req.params.id],
    index: req.params.id,
    stats: stat,
  });
});

app.post("/pokemon", (req, res) => {
  pokemon.push(req.body);
  console.log(req.body);
  res.redirect("/pokemon");
});

app.put("/pokemon/:id", (req, res) => {
  pokemon[req.params.id] = req.body;
  res.redirect("/pokemon");
});

app.delete("/pokemon/:id", (req, res) => {
  pokemon.splice(req.params.id, 1); //remove the item from the array
  res.redirect("/pokemon");
});

app.listen(3000, (req, res) => {
  console.log("server is running on port 3000");
});
