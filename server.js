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

let geslachtButton = document.querySelector('.geslacht');
let radioButtons = document.querySelectorAll('input[name="geslacht"]');

let textoutput = document.querySelector('.textoutput');

let ul = document.querySelector('ul');
let select = document.querySelector('select');

let gymgender = document.querySelector('.gymgender');

select.addEventListener('change', () => {

    //if de value van de dropdown is basic, trigger renderbasicfitRestult, else if value vd dropdown = big, trigger renderbigGymResult, else if value vd dropdown = free, trigger die 

    if (select.value === 'Basic-Fit'){
        renderbasicFitResult();
    } else if (select.value === 'BigGym') {
        renderbigGymResult();
    } else if (select.value === 'Trainmore') {
        rendertrainMoreResult ();
    } else if (select.value === 'VondelGym') {
      rendervondelGymResult ();
    }
});



//basicFitResult is alle data waarvan de Sportschool gelijk is aan 'Basic-fit'
const basicFitResult = userList.filter(userList => userList.Sportschool === 'Basic-Fit');
//hetzelfde voor de andere 3
const bigGymResult = userList.filter(userList => userList.Sportschool === 'BigGym');
const trainMoreResult = userList.filter(userList => userList.Sportschool === 'Trainmore');
const vondelGymResult = userList.filter(userList => userList.Sportschool === 'VondelGym');





function renderbasicFitResult() {
    //Met clear haal je de hele ul leeg zodat er geen dubbele data inkomt.
    clearUl();
    basicFitResult.forEach((filterData) => {
        allUsersHTML = `<li>
            <p>${filterData.Naam}</p>
        </li>`
        ul.insertAdjacentHTML("beforeend", allUsersHTML);
        console.log(basicFitResult);
    });
}

function renderbigGymResult() {
    //Met clear haal je de hele ul leeg zodat er geen dubbele data inkomt.
    clearUl();
    bigGymResult.forEach((filterData) => {
        allUsersHTML = `<li>
            <p>${filterData.Naam}</p>
        </li>`
        ul.insertAdjacentHTML("beforeend", allUsersHTML);
    });
}

function rendertrainMoreResult() {
    //Met clear haal je de hele ul leeg zodat er geen dubbele data inkomt.
    clearUl();
    trainMoreResult.forEach((filterData) => {
        allUsersHTML = `<li>
            <p>${filterData.Naam}</p>
        </li>`
        ul.insertAdjacentHTML("beforeend", allUsersHTML);
    });
}



function rendervondelGymResult() {
  //Met clear haal je de hele ul leeg zodat er geen dubbele data inkomt.
  clearUl();
  vondelGymResult.forEach((filterData) => {
      allUsersHTML = `<li>
          <p>${filterData.Naam}</p>
      </li>`
      ul.insertAdjacentHTML("beforeend", allUsersHTML);
  });
}





function clearUl() {
    ul.innerHTML = "";
}

function clearP() {
    textoutput.innerHTML = "";
}




function checkGeslacht() {
    
    let selectedGeslacht;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedGeslacht = radioButton.value;
            //terminate loop met break omdat je maar 1 geslacht kan zijn
            break;
        }
    }
    
    if (selectedGeslacht === 'man' ) {
        renderMan();

    } else if(selectedGeslacht === 'vrouw') {
        renderVrouw();
    }
}


function renderMan() {
    clearP();
    manResult.forEach((filterData) => {
        allUsersHTML = `
            <p>${filterData.Naam}</p>`
            textoutput.insertAdjacentHTML("beforeend", allUsersHTML);
    });
}

const manResult = userList.filter(userList => userList.Geslacht === 'Man');

function renderVrouw() {
    clearP();
    vrouwResult.forEach((filterData) => {
        allUsersHTML = `
            <p>${filterData.Naam}</p>`
            textoutput.insertAdjacentHTML("beforeend", allUsersHTML);
    });
}
const vrouwResult = userList.filter(userList => userList.Geslacht === 'Vrouw');


geslachtButton.addEventListener('click', checkGeslacht);