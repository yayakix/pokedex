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

app.get('/pokemon', (req,res) => {
    res.render('index.ejs', {pokemon : pokemon})
})

app.get('/pokemon/:id', (req,res) => {
res.render("show.ejs", { pokemon: pokemon[req.params.id] });
})
// shows individual pokemon stat pages


app.get("/pokemon/:id/edit", (req, res) => {

});

app.post("/pokemon", (req, res) => {
    pokemon.push(req.body)
    console.log(req.body)
res.redirect('/pokemon')
});

app.put("/pokemon/:id", (req, res) => {

});

app.delete("/pokemon/:id", (req, res) => {

});




app.listen(3000, (req, res) => {
    console.log('server is running on port 3000')
})