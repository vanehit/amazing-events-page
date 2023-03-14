//importamos el archivo donde esta el data
import data from './amazing.js';




// Obtenemos los elementos del DOM que necesitamos
const containerCards = document.getElementById("container-cards");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const searchInput = document.getElementById("search-input");
const categoryList = document.getElementById("category-list");

const filteredEvents = data.events;

//funcion para crear los checkboxes
function createCheckbox(array, container) {
  // Obtener una lista de categorías únicas de los eventos
  //con el operador spread (...)suelta los elementos en donde lo ponemos y el constructor set creamos un nuevo array. Set es un objeto que nos permite almacenar valores unicos para no repetir los eventos// con el map() iteramos el array y devuelve un valor 
  const categoriesOptions = [...new Set(array.map(event => event.category))];


  // Crear checkbox para "All" y agregarlo al contenedor
  const allLabel = document.createElement("label");
  const allCheckbox = document.createElement("input");
  allCheckbox.addEventListener('change', () => {
    if (allCheckbox.checked) {
      createEventCards(data.events, containerCards);
    } else {
      containerCards.innerHTML = '';
    }
  });
  allCheckbox.type = "checkbox";
  allCheckbox.name = "category";
  allCheckbox.value = "All";
  allCheckbox.id = "true";
  allCheckbox.id = "true";
  allCheckbox.checked = true; // Marcamos el checkbox All como seleccionado por defecto
  allLabel.appendChild(allCheckbox);
  allLabel.appendChild(document.createTextNode("All"));
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
  

  // Agregamos un event listener para manejar el cambio de estado de los checkboxes
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selectedCategories = Array.from(container.querySelectorAll('input[name="category"]:checked')).map(input => input.value);
      const filteredEvents = data.events.filter(event => {
        return selectedCategories.includes('All') || selectedCategories.includes(event.category);
      });
      createEventCards(filteredEvents, containerCards);
    });
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
          </div>
          <a href="../pages/details.html?id=${newCard._id}" class="btn btn-events btn-showDetails">Show Details</a>
        </div>
      `;
    const cardElement = document.createElement('div');
    cardElement.innerHTML = card;
    containerCards.appendChild(cardElement);

  }
  // Agrega un controlador de eventos a cada botón "Show Details"
  //seleccione todos lo elementos del DOM que tenga la clase btn-details
  const detailButtons = containerCards.querySelectorAll('.btn-showDetails');
  //iteramos sobre cada boton seleccionado
  detailButtons.forEach(button => {

    button.addEventListener('click', () => {

      // Obtiene el elemento único de la tarjeta correspondiente
      //busca el elemento ascendente más cercano o sea el padre
      const cardElement = button.closest('.card');
      //obtengo el valor del atributo
      const eventId = cardElement.getAttribute('data-id');
      // Navega a la página de detalles correspondiente
      window.location.href = `../pages/details.html?id=${eventId}`;
    });
  });
}

createEventCards(filteredEvents, containerCards);
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
  //trim()elimina espacios en blanco principio y al final de una cadena de texto.
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