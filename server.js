const chalk = require('chalk');
const express = require ('express');
const path = require("path");
const { engine } =  require('express-handlebars');





const app = express();
app.get ('/', onHome);
app.get ('/filteropen', opendefilter);

app.listen(1337, console.log(chalk.blue(`Running on 1337`)))


function opendefilter(req, res) {
  res.send('Baarn is hard')
  }

 



  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", "./views");
  function onHome(req, res)
  { res.render('test.hbs') 
}

  app.get('/', (req, res) => {    
    onHome();
  })