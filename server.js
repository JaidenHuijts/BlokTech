const chalk = require('chalk');

const path = require("path");
const {
  engine
} = require('express-handlebars');
const {
  filter
} = require('lodash');

// //connectie
// app.listen(1337, console.log(chalk.blue(`Running on 1337`)))

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

app.get('/', (req, res) => {
  res.render('normalstate', {
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

   

  


  app.get('/planner', (req, res) => {
    res.render('planner', {
      layout: 'index'
    });
  });




//API








//Error
app.get('/*', (req, res) => {
  res.json({
    status: 'FAILED',
    message: '404 - page not found'
  });
});
