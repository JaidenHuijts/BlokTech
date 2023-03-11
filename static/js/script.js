

let geslachtButton = document.querySelector('.geslacht');
let radioButtons = document.querySelectorAll('input[name="geslacht"]');

let textoutput = document.querySelector('.textoutput');

let ul = document.querySelector('ul');
let select = document.querySelector('select');

let gymgender = document.querySelector('.gymgender');

// select.addEventListener('change', () => {

//     //if de value van de dropdown is basic, trigger renderbasicfitRestult, else if value vd dropdown = big, trigger renderbigGymResult, else if value vd dropdown = free, trigger die 

//     if (select.value === 'Basic-Fit'){
//         renderbasicFitResult();
//     } else if (select.value === 'BigGym') {
//         renderbigGymResult();
//     } else if (select.value === 'Trainmore') {
//         rendertrainMoreResult ();
//     } else if (select.value === 'VondelGym') {
//       rendervondelGymResult ();
//     }
// });



// //basicFitResult is alle data waarvan de Sportschool gelijk is aan 'Basic-fit'
// const basicFitResult = userList.filter(userList => userList.Sportschool === 'Basic-Fit');
// //hetzelfde voor de andere 3
// const bigGymResult = userList.filter(userList => userList.Sportschool === 'BigGym');
// const trainMoreResult = userList.filter(userList => userList.Sportschool === 'Trainmore');
// const vondelGymResult = userList.filter(userList => userList.Sportschool === 'VondelGym');





// function renderbasicFitResult() {
//     //Met clear haal je de hele ul leeg zodat er geen dubbele data inkomt.
//     clearUl();
//     basicFitResult.forEach((filterData) => {
//         allUsersHTML = `<li>
//             <p>${filterData.Naam}</p>
//         </li>`
//         ul.insertAdjacentHTML("beforeend", allUsersHTML);
//         console.log(basicFitResult);
//     });
// }

// function renderbigGymResult() {
//     //Met clear haal je de hele ul leeg zodat er geen dubbele data inkomt.
//     clearUl();
//     bigGymResult.forEach((filterData) => {
//         allUsersHTML = `<li>
//             <p>${filterData.Naam}</p>
//         </li>`
//         ul.insertAdjacentHTML("beforeend", allUsersHTML);
//     });
// }

// function rendertrainMoreResult() {
//     //Met clear haal je de hele ul leeg zodat er geen dubbele data inkomt.
//     clearUl();
//     trainMoreResult.forEach((filterData) => {
//         allUsersHTML = `<li>
//             <p>${filterData.Naam}</p>
//         </li>`
//         ul.insertAdjacentHTML("beforeend", allUsersHTML);
//     });
// }



// function rendervondelGymResult() {
//   //Met clear haal je de hele ul leeg zodat er geen dubbele data inkomt.
//   clearUl();
//   vondelGymResult.forEach((filterData) => {
//       allUsersHTML = `<li>
//           <p>${filterData.Naam}</p>
//       </li>`
//       ul.insertAdjacentHTML("beforeend", allUsersHTML);
//   });
// }





// function clearUl() {
//     ul.innerHTML = "";
// }

// function clearP() {
//     textoutput.innerHTML = "";
// }




// function checkGeslacht() {
    
//     let selectedGeslacht;
//     for (const radioButton of radioButtons) {
//         if (radioButton.checked) {
//             selectedGeslacht = radioButton.value;
//             //terminate loop met break omdat je maar 1 geslacht kan zijn
//             break;
//         }
//     }
    
//     if (selectedGeslacht === 'man' ) {
//         renderMan();

//     } else if(selectedGeslacht === 'vrouw') {
//         renderVrouw();
//     }
// }


// function renderMan() {
//     clearP();
//     manResult.forEach((filterData) => {
//         allUsersHTML = `
//             <p>${filterData.Naam}</p>`
//             textoutput.insertAdjacentHTML("beforeend", allUsersHTML);
//     });
// }

// const manResult = userList.filter(userList => userList.Geslacht === 'Man');

// function renderVrouw() {
//     clearP();
//     vrouwResult.forEach((filterData) => {
//         allUsersHTML = `
//             <p>${filterData.Naam}</p>`
//             textoutput.insertAdjacentHTML("beforeend", allUsersHTML);
//     });
// }
// const vrouwResult = userList.filter(userList => userList.Geslacht === 'Vrouw');


// geslachtButton.addEventListener('click', checkGeslacht);