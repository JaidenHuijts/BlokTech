


const URL = "https://date.nager.at/api/v3/publicholidays/2023/NL";
const list = document.querySelector(".list");


function freeDays() {
    getData(URL).then((data) => {
        var eventData = data;
        eventData.forEach((allEvents) => {
            allEventsHTML = `<a href='http://localhost:1337/afspraak'><li id="dates">
                           <h2>${allEvents.localName}</h2>                                                                                 
                             <p>${allEvents.date}</p>                  
                             </li>
                             </a>`;
            list.insertAdjacentHTML("beforeend", allEventsHTML);
        });
    });
}
async function getData(URL) {
    return fetch(URL).then((response) => response.json()).then((jsonData) => jsonData);
}
freeDays();

window.onload = function () {
    document.querySelector('aside').classList.add('melding')


};