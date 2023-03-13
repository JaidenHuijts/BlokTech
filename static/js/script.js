


const URL = "https://date.nager.at/api/v3/publicholidays/2022/NL";
const list = document.querySelector(".list");

function freeDays() {
    getData(URL).then((data) => {
        var eventData = data;
        eventData.forEach((allEvents) => {
            allEventsHTML = `<li>
                           <h2>${allEvents.localName}</h2>                                                                                 
                             <p>${allEvents.date}</p>                  
                             </li>`;
            list.insertAdjacentHTML("beforeend", allEventsHTML);
        });
    });
}
async function getData(URL) {
    return fetch(URL).then((response) => response.json()).then((jsonData) => jsonData);
}
freeDays();