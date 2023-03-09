
import data from './amazing.js';


// Obtenemos los elementos del DOM que necesitamos
const containerCards = document.getElementById("container-cards");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const searchInput = document.getElementById("search-input");
const categoryList = document.getElementById("category-list");

const upcomingEvents = [];

// obtener la fecha base o de referencia
const baseDate = new Date(data.currentDate);


// recorrer el array de eventos y obtener la fecha de cada evento
data.events.forEach(event => {
  const eventDate = new Date(event.date);
  // hacer algo con la fecha del evento
  if(eventDate > baseDate){
   upcomingEvents.push(event)
  }
});

console.log(upcomingEvents);

//funcion para crear los checkboxes
function createCheckbox(array, container){
    // Obtener una lista de categorías únicas de los eventos
    const categoriesOptions = [...new Set(array.map(event => event.category))];
    
    // Agregar "All" al inicio del array de categorías
    categoriesOptions.unshift("All");
    
    // Crear checkbox para "All" y agregarlo al contenedor
    const allLabel = document.createElement("label");
    const allCheckbox = document.createElement("input");
    allCheckbox.type = "checkbox";
    allCheckbox.name = "category";
    allCheckbox.value = "All";
    container.appendChild(allLabel);
  
    // Crear checkbox para cada categoría y agregarlo al contenedor
    categoriesOptions.forEach(category => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "category";
      checkbox.value = category;
  
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(category));
      container.appendChild(label);
    });
  }


// Llamamos a la función para crear los checkboxes de categorías
createCheckbox(data.events, categoryList)


// Recorremos la lista de eventos y creamos las cards 
function createEventCards(events, containerCards) {
    containerCards.innerHTML = "";
    for (let i = 0; i < events.length; i++) {
      const newCard = events[i];
      const card = `
        <div class="card shadow" data-id="${i}">
          <img src="${newCard.image}" class="card-img-top" alt="${newCard.name}">
          <div class="card-body">
            <h5 class="card-title">${newCard.name}</h5>
            <p class="card-text">${newCard.date}</p>
            <p class="card-text">${newCard.description}</p>
            <p class="card-text">${newCard.category}</p>
            <p class="card-text">${newCard.place}</p>
            <p>Capacity: $${newCard.capacity}</p>
            <p>Assistance: $${newCard.assistance}</p>
            <p>Price: $${newCard.price}</p>
            <a href="../pages/details.html" class="btn btn-events">Show Details</a>
          </div>
        </div>
      `;
      const cardElement = document.createElement('div');
      cardElement.innerHTML = card;
      containerCards.appendChild(cardElement);
    }
  
    // Agrega un controlador de eventos a cada botón "Show Details"
    const detailButtons = containerCards.querySelectorAll('.btn-events');
    detailButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Obtiene el identificador único de la tarjeta correspondiente
        const cardElement = button.closest('.card');
        const cardId = cardElement.getAttribute('data-id');
       
        
        // Navega a la página de detalles correspondiente
        window.location.href = `../pages/details.html?id=${cardId}`;
      });
    });
  }
  
  createEventCards(data, containerCards);
/*aca se crea una variable for i inicializada en 0, se evalúa la condición de que i sea menor que la longitud del array events, y en cada iteración se aumenta el valor de i en 1. Dentro del cuerpo del bucle, se obtiene el elemento actual del array usando la notación de corchetes (events[i]) y se procede a crear la tarjeta con los datos correspondientes*/



// Agregamos un evento "change" a cada checkbox y llamamos a la función createEventCards con un arreglo filtrado de eventos según la categoría seleccionada.
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", event => {
      const category = event.target.value;
      let filteredEvents = data.events;
      if (category !== "All") {
        filteredEvents = data.events.filter(newCard => newCard.category === category);
      }
      createEventCards(filteredEvents, containerCards);
    });
  });

// Agregamos un evento "change" al menú desplegable de categorías y llamamos a la función createEventCards con un arreglo filtrado de eventos según la categoría seleccionada.
categoryList.addEventListener("change", event => {
  const category = event.target.value;
  let filteredEvents = data.events;
  if (category !== "All") {
    filteredEvents = data.events.filter(newCard => newCard.category === category);
  }
  createEventCards(filteredEvents, containerCards);
});

searchInput.addEventListener("input", event => {
  const searchTerm = event.target.value.toLowerCase().trim();
  let filteredEvents = data.events;
  if (searchTerm !== "") {
    filteredEvents = data.events.filter(newCard => {
      const name = newCard.name.toLowerCase();
      const description = newCard.description.toLowerCase();
      return name.includes(searchTerm) || description.includes(searchTerm);
    });
  }
  createEventCards(filteredEvents, containerCards);
});
