const chalk = require('chalk');

const path = require("path");
const {
  engine
} = require('express-handlebars');
const {
  filter,
  update
} = require('lodash');
const express = require('express');
const app = express();




//database
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


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
  console.log(chalk.blue(`Server listenting to port: ${PORT}`))
});


//Routes

app.get('/afspraak', (req, res) => {
  collection.insertOne(req.body);

  res.render('afspraak', {
    layout: 'index'
  });
});


app.get('/filteropen/:id', async (req, res) => {
  console.log('@@-- test', req.params.id)
  // fetch de sportschool by id
  

  // logic db call -> template aanroepen -> de data meegeven aan de template ||
  const db = client.db('GymbuddyApp').collection('Sporters');
  console.log(req.body.sportniveau)
  console.log(req.body.geslacht) //In een req.body staat formulier data die je gepost heb
  const sporter = await db.find({
    Geslacht: req.body.geslacht,
    Sportniveau: req.body.sportniveau,
    Leeftijd: req.body.leeftijd,
    Spiergroep: req.body.spiergroep
  }).toArray();
  console.log('@@-- data', sporter);


  res.render('filteropen', {
    data: sporter


  });
});


app.post('/resultatenlijst', async (req, res) => {
  // logic db call -> template aanroepen -> de data meegeven aan de template ||
  const db = client.db('GymbuddyApp').collection('Sporters');
  console.log(req.body.sportniveau)
  console.log(req.body.geslacht) //In een req.body staat formulier data die je gepost heb
  const sporter = await db.find({Geslacht: req.body.geslacht, Sportniveau: req.body.sportniveau, Leeftijd: req.body.leeftijd, Spiergroep: req.body.spiergroep}).toArray();
  console.log('@@-- data', sporter);
 

  res.render('resultatenlijst', {
    data: sporter
    
    
  });
});


// Multer add

const GymbuddyApp = client.db('GymbuddyApp');
const collection = GymbuddyApp.collection('Afspraken')


const multer = require('multer');
const upload = multer();

app.get('/', async (req, res) => {
  const db = client.db('GymbuddyApp').collection('Sportschool');
  const zoekSportscholen = await db.find({}).toArray();
  console.log('@@-- zoek sportscholen', zoekSportscholen);
  res.render('normalstate', {
    title: 'Gym overview',
    data: zoekSportscholen
  });
});




app.post('/afspraakbevestigd', upload.any(), async (req, res) => {;
  res.render('afspraakbevestigd', {
    title: 'Afspraak gemaakt',
 
  });
  collection.insertOne(req.body);
  console.log(req.body);
});





//API

app.get('/planner', (req, res) => {
  res.render('planner', {
    layout: 'index'
  });
});



//Error
app.get('/*', (req, res) => {
  res.render('404', {
    status: 'FAILED',
    message: '404 - page not found'
  });
});