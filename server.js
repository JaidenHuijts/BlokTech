const chalk = require('chalk');
const express = require('express');
const path = require("path");
const { engine } = require('express-handlebars');
const { filter } = require('lodash');



const app = express();
require('dotenv').config({path:'.env'})
const PORT = process.env.PORT || 1337;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(
  uri, 
  {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1}
)

client.connect()
.then((res) => console.log ('@@-- connection established'))
.catch((err) => console.log ('@@--error', err))

app.listen(PORT, () => {
  console.log(`Server listening to port: PORT`)
});

app.get('/', async (req, res) => {
  const db = client.db('GymbuddyApp').collection('Sporters');
  const example = await db.find({}).toArray();


res.json({
  succes: true,
  message: 'connected',
  example
})



app.engine(`.hbs`, engine({
  defaultLayout: `normalstate`,
  layoutsDir: (__dirname + `/views/layouts`),
  partialsDir: (__dirname + `/views/partials`),
  extname: `.hbs`
}));

app.set(`view engine`, `.hbs`);
app.set(`views`, `./views`);

app.use(express.static(__dirname + '/static'));
app.get("/static", (req, res) => {
  res.render("static");
});
app.use(express.urlencoded({ extended: true }));



app.get('/', onHome);
app.get('/filteropen', filteropen);
// app.get('/startup', startup);


// // 
// app.post('/filteropen', (req, res) => {
//   const userList= req.body.Sportschool;

// res.send(`Voorkeuren aangepast`)
// });

app.listen(1337, console.log(chalk.blue(`Running on 1337`)))

// Home pagina

function onHome(req, res) {    
  res.render(`normalstate`, { 
    layout: `index`,
    data: userList
  });}

app.get('/', (req, res) => {
  onHome();
})

app.post('/filteropen', (req,res) => {
  // data uit rquest object halen
  const user = req.body.user
  Collection.save(Sporters)
})

const userList = [
  {
    id:'jespervandriel',
    Naam: 'Jesper van Driel',
    Leeftijd: 20,
    Spiergroep: 'Borst',
    Geslacht: 'Man',
    Sportschool: 'Basic-Fit',
    Sportniveau: 'Gevorderd'
  },
  {
    id:'jaidenhuijts',
    Naam: 'Jaiden Huijts',
    Leeftijd: 21,
    Spiergroep: 'Rug',
    Geslacht: 'Man',
    Sportschool: 'Big Gym',
    Sportniveau: 'Gevorderd'
  },
  {
    id:'jazzlinschenk',
    Naam: 'Jazzlin Schenk',
    Leeftijd: 19,
    Spiergroep: 'Benen',
    Geslacht: 'Vrouw',
    Sportschool: 'Alle sportscholen',
    Sportniveau: 'Gemiddeld'
  },
  {
    id:'joshuatourlamain',
    Naam: 'Joshua Tourlamain',
    Leeftijd: 20,
    Spiergroep: 'Bicep',
    Geslacht: 'Man',
    Sportschool: 'Alle sportscholen',
    Sportniveau: 'Beginner'
  }
];

// Filteropenpagina
function filteropen(req, res) {
  res.render(`filteropen`, { data: userList, layout: `index`})}

  app.get('/', (req, res) => {
    filteropen();
  })


