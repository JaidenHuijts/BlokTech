const chalk = require('chalk');
const express = require('express');
const path = require("path");
const { engine } = require('express-handlebars');
const { filter } = require('lodash');



const app = express();
app.get('/', onHome);
app.get('/filteropen', filteropen);
// app.get('/startup', startup);

app.listen(1337, console.log(chalk.blue(`Running on 1337`)))

const userList = [
  {
    id:'jespervandriel',
    Naam: 'Jesper van Driel',
    Leeftijd: 20,
    Spiergroep: 'Borst',
    Geslacht: 'Man',
    Sportschool: 'Basic-Fit' 
  },
  {
    id:'jaidenhuijts',
    Naam: 'Jaiden Huijts',
    Leeftijd: 21,
    Spiergroep: 'Rug',
    Geslacht: 'Man',
    Sportschool: 'Big Gym' 
  },
  {
    id:'jazzlinschenk',
    Naam: 'Jazzlin Schenk',
    Leeftijd: 19,
    Spiergroep: 'Benen',
    Geslacht: 'Vrouw',
    Sportschool: 'Alle sportscholen' 
  }
]



app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(__dirname + '/static'));
app.get("/static", (req, res) => {
  res.render("static");
});







// Home pagina

function onHome(req, res) {    
  res.render(`normalstate`, { 
    layout: `index`,
    data: userList
  });}

app.get('/', (req, res) => {
  onHome();
})

app.engine(`.hbs`, engine({
  defaultLayout: `normalstate`,
  layoutsDir: (__dirname + `/views/layouts`),
  partialsDir: (__dirname + `/views/partials`),
  extname: `.hbs`
}));

app.set(`view engine`, `.hbs`);
app.set(`views`, `./views`);







// Filteropenpagina
function filteropen(req, res) {
  res.render(`filteropen`, { layout: `index`})}

  app.get('/', (req, res) => {
    filteropen();
  })
  
  app.engine(`.hbs`, engine({
    defaultLayout: `filteropen`,
    layoutsDir: (__dirname + `/views/layouts`),
    partialsDir: (__dirname + `/views/partials`),
    extname: `.hbs`
  }));
  
  app.set(`view engine`, `.hbs`);
  app.set(`views`, `./views`);