
const chalk = require('chalk');


const path = require("path");
const { engine } = require('express-handlebars');
const { filter } = require('lodash');

// //connectie
// app.listen(1337, console.log(chalk.blue(`Running on 1337`)))

//database
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));



 
require('dotenv').config({ path: '.env' });
const PORT = process.env.PORT || 1337;



//handlebars 
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
 
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_CONNECTION_STRING;
 
const client = new MongoClient(
 uri, 
 { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
)
 
client.connect()
 .then((res) => console.log('@@-- connection established'))
 .catch((err) => console.log('@@-- error', err))
 
app.listen(PORT, () => {
 console.log(chalk.blue(`Server listenting to port: PORT`))
});
 
app.get('/test', async (req, res) => {
 // logic db call -> template aanroepen -> de data meegeven aan de template ||
 const db = client.db('GymbuddyApp').collection('Sporters');
 const example = await db.find({}).toArray();
 console.log('@@-- data', example);
 
 res.json({
 succes: true,
 message: 'connected',
 example
 })
});
 
// app.post('/filteropen', function(req, res) {
//  // sla data op in db
// })







//ROUTES
// app.get('/', onHome);
// app.get('/filteropen', filteropen);
// // app.get('/startup', startup);


app.get('/', (req, res) => {
	res.render('normalstate', { layout: 'index'});
});



app.get('/filteropen', (req, res) => {
	res.render('filteropen', { layout: 'index'});
});


//Error
app.get('/*', (req, res) => {
	res.json({
		status: 'FAILED',
		message: '404 - page not found'
	});
});


app.get('/filteropen', async (req, res)=>{
  await db.collection('Sporters').find({}, (error, Naam)=> {
  if(error) console.log(error);
  res.render('filteropen.hbs', {
     Sporters: Naam
  })
})
})

