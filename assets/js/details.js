import data from './amazing.js';

let cardsContainer = document.getElementById("container-cards");

// Obtenemos el ID del evento de la URL o sea la ruta

const queryString = location.search
/*obtenemos el parametro */
const params = new URLSearchParams(queryString)
/*ID */
const id = params.get("id")
const selectedEvent = data.events.find(event => event._id == id)

function createEventsCard(card, container) {
  container.innerHTML = "";
  let div = document.createElement("div")
  div.classList = 'card-details'
  div.className = "card-details"
  div.innerHTML += `
   
        <img src="${card.image}" class="card-img-top" alt="${card.name}">
        <div class="card-body">
          <h5 class="card-title" id="event-name">${card.name}</h5>
          <p class="card-text" id="event-date">${card.date}</p>
          <p class="card-text" id="event-description">${card.description}</p>
          <p class="card-text" id="event-category">${card.category}</p>
          <p class="card-text" id="event-place">${card.place}</p>
          <p id="event-capacity">${card.capacity}</p>
          <p id="event-assistance">${card.assistance}</p>
          <p id="event-price">${card.price}</p>
        </div>
    `;

  container.appendChild(div);

}

createEventsCard(selectedEvent, cardsContainer);