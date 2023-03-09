import data from './amazing.js';


const container = document.getElementById('btn-details');

// Obtenemos el ID del evento de la URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = parseInt(urlParams.get('id'));


// Buscamos el evento correspondiente en el archivo data
const event = data.events.find(event => event.id === eventId);

if (event) {
  //si el evento existe 
  // Creamos la vista de detalles del evento
  const details = createEventDetails(event);
  
  // y lo agregamos la vista de detalles del evento al contenedor correspondiente en la página HTML
  container.appendChild(details);
} else {
  showNotFound(container);
  
}

// Función para crear la vista de detalles del evento
function createEventDetails(event) {
  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('card', 'shadow');
  detailsContainer.id = 'btn-details';

  const details = `
    <div class="row">
      <div class="col-md-4">
        <img src="${event.image}" class="card-img-top" alt="${event.name}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title" id="event-name">${event.name}</h5>
          <p class="card-text" id="event-date">${event.date}</p>
          <p class="card-text" id="event-description">${event.description}</p>
          <p class="card-text" id="event-category">${event.category}</p>
          <p class="card-text" id="event-place">${event.place}</p>
          <p id="event-capacity">${event.capacity}</p>
          <p id="event-assistance">${event.assistance}</p>
          <p id="event-price">${event.price}</p>
        </div>
      </div>
    </div>
  `;

  detailsContainer.innerHTML = details;
  return detailsContainer;

}

// Función para mostrar mensaje "Evento no encontrado" en el contenedor
function showNotFound(container) {
  const message = document.createElement('p');
  message.innerHTML = 'Evento no encontrado';
  container.appendChild(message);
}

