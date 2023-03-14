const chalk = require('chalk');

const path = require("path");
const {
  engine
} = require('express-handlebars');
const {
  filter, update
} = require('lodash');





//database
const express = require('express');
const app = express();
app.use(express.urlencoded({
  extended: true
}));




require('dotenv').config({
  path: '.env'
});
const PORT = process.env.PORT || 1337;



//handlebars 
app.engine(`.hbs`, engine({
  defaultLayout: `index`,
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
app.use(express.urlencoded({
  extended: true
}));
//

//database connectie
const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');
const uri = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(
  uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  }
)

client.connect()
  .then((res) => console.log('@@-- connection established'))
  .catch((err) => console.log('@@-- error', err))

app.listen(PORT, () => {
  console.log(chalk.blue(`Server listenting to port: PORT`))
});


//Routes

// app.get('/', (req, res) => {
//   res.render('normalstate', {
//     layout: 'index'
//   });
// });

app.get('/addgym', (req, res) => {
  collection.insertOne(req.body);

  res.render('addgym', {
    layout: 'index'
  });
});


app.post('/filteropen', async (req, res) => {
  // logic db call -> template aanroepen -> de data meegeven aan de template ||
  const db = client.db('GymbuddyApp').collection('Sporters');
  console.log(req.body.sportniveau)
  console.log(req.body.geslacht) //In een req.body staat formulier data die je gepost heb
  const sporter = await db.find({Geslacht: req.body.geslacht, Sportniveau: req.body.sportniveau, Leeftijd: req.body.leeftijd, Spiergroep: req.body.spiergroep}).toArray();
  console.log('@@-- data', sporter);
 

  res.render('filteropen', {
    data: sporter
    
    
  });
});


   

  

// Multer add

const GymbuddyApp = client.db('GymbuddyApp');
const collection = GymbuddyApp.collection('Sportschool')


const multer = require('multer');
const upload = multer();

app.get('/', async(req, res) => {
  const db = client.db('GymbuddyApp').collection('Sportschool');   
  const zoekSportscholen = await db.find({}).toArray();    
  res.render('normalstate', { title: 'Gym toegevoegd', data: zoekSportscholen  });


});

// app.post('/', upload.any(), async(req, res) => {
//   res.render('normalstate', {title: 'Gym Toegevoegd'});
// collection.insertOne(req.body);
// console.log(req.body);
// })






//API

app.get('/planner', (req, res) => {
  res.render('planner', {
    layout: 'index'
  });
});






//Error
app.get('/*', (req, res) => {
  res.json({
    status: 'FAILED',
    message: '404 - page not found'
  });
});
