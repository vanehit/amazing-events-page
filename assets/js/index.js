//importamos la data
import data from "./amazing.js"

let cardsContainer = document.getElementById("container-cards");

let events = data.events;

const fragment = document.createDocumentFragment();

/*crea tarjetas de eventos y las inserta en un contenedor en la página */
function createEventsCard(array, container) {
    container.innerHTML = ""; // Borra todo el contenido previo del contenedor
    for (let newCard of array) { //Itera por cada objeto de evento en el array
        let div = document.createElement("div") // Crea un nuevo elemento <div> para la tarjeta
        div.className = "card" // Asigna la clase CSS "card" al elemento <div>
        div.innerHTML +=
            `
       
            <img src="${newCard.image}" class="card-img-top"
            alt="${newCard.name}">
            <div class="card-body">
                <h5 class="card-title">${newCard.name}</h5>
                <p class="card-text">${newCard.date}</p>
                <p class="card-text">${newCard.description}</p>
                <p class="card-text">${newCard.category}</p>
                <p class="card-text">${newCard.place}</p>
                <p>Capacity: $${newCard.capacity}</p>
                <p>Assistance: $${newCard.assistance}</p>
                <p>Price: $${newCard.price}</p>
                <a href="../pages/details.html?id=${newCard._id}" class="btn btn-events">Show Details</a>
            </div>
           
        
      ` // Agrega el contenido HTML de la tarjeta al elemento <div>
        fragment.appendChild(div);
    }

    container.appendChild(fragment); // Agrega el elemento <div> con la tarjeta al contenedor
}

createEventsCard(events, cardsContainer); //"activa" la función para que se creen y se inserten las tarjetas de eventos en la página web


/*creamos una lista de categorías sin repeticiones a partir del array*/
//definimos la variable para agregar dinamicamente los chekcboxes
const $checkboxes = document.getElementById("checkboxes");
// creamos la funcion que toma un arreglo de eventos como argumento
const createEventsCategories = (array) => {
    // el método map crea un nuevo arreglo que contenga únicamente las categorías de los eventos
    let categories = array.map(category => category.category)
    //con el operador spread (...)suelta los elementos en donde lo ponemos y el constructor set creamos un nuevo array. Set es un objeto que nos permite almacenar valores unicos para no repetir los eventos.
    let categoriesUnrepeat = [...(new Set(categories))]
    //retorna el array con las categorias unicas
    return categoriesUnrepeat
}

/*llamamos a la fn con el arreglo de eventos events como argumento y se almacena el resultado en la variable categories. Esto nos da un arreglo con todas las categorías únicas presentes en la lista de eventos.*/
let categories = createEventsCategories(events);
//tomamos dos argumentos: el arreglo de categorías categories y la referencia al elemento HTML $checkboxes donde se van a crear los check
const createEventsCheckboxes = (categories, $checkboxes) => {
    //iterar sobre el arreglo de categorías
    categories.forEach(category => {
        //creamos un nuevo elemento HTML
        let div = document.createElement('div')
        //asignamos la clase 
        div.className = `form-check`
        //definimos el contenido HTML con el div
        div.innerHTML = `
        <input class="form-check-input" type="checkbox" value="${category}" id="${category}" name="categories">
        <label class="form-check-label" for="${category}">${category}</label>
        `
        //agregamos el elemento div al elemento HTML referenciado con $checkboxes
        $checkboxes.appendChild(div)
    })
}



//llamamos a la fn 
createEventsCheckboxes(categories, $checkboxes)


//creamos esta fn para filtrar los eventos basados en los check seleccionados
const filterEventsCheckboxes = (array) => {
    //definimos la variable checked para para convertir la lista de nodos obtenidas
    let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    //Se define una variable reChecked que utiliza el método map para crear un nuevo arreglo que contenga sólo los valores del atributo id de los elementos del arreglo checked, pero en minúsculas.
    let reChecked = checked.map(event => event.id.toLocaleLowerCase())
    //aca la función filtra los eventos que pertenecen a las categorías seleccionadas en la interfaz.
    let filterCheck = array.filter(element => reChecked.includes(element.category.toLowerCase()))
    //Imprimimos el resultado del filtrado en la consola.
    console.log(filterCheck);
    //Si el arreglo filterEventsCheck tiene al menos un elemento, se retorna este arreglo filtrado. De lo contrario, se retorna el arreglo original arrayEvents.
    if (filterCheck.length > 0) {
        return filterCheck
    } else {
        return array
    }
}


//creamos la fn que se encarga de filtrar los eventos cuyos nombres contienen el valor de búsqueda en su nombre (sin importar si están en mayúsculas o minúsculas).
const $search = document.getElementById("search-input");

const filterEventsSearch = (array, value) => {
    let filteredArray = array.filter(event => event.name.toLowerCase().includes(value.toLocaleLowerCase()))
    return filteredArray
}

/*creamos la fn que combina los resultados de los dos filtros (por categorías y por término de búsqueda) para obtener un arreglo de eventos que cumplan ambos criterios y lo devuelve como resultado. */
// se encarga de filtrar los eventos según los criterios seleccionados por el usuario.
const filterAndPrint = (array) => {
    //aca se actualiza con el resultado de llamar a la función filterSearch para filtrar aún más los eventos según el término de búsqueda ingresado por el usuario.
    let newEventsArray = filterEventsCheckboxes(array)
    newEventsArray = filterEventsSearch(newEventsArray, $search.value)
    //se devuelve el arreglo de eventos filtrado
    return newEventsArray
}


/*En este paso, se agrega un evento de escucha al elemento checkboxes usando el método addEventListener. Este evento se activa cada vez que el usuario hace clic en uno de los checkboxes. */
$checkboxes.addEventListener('change', () => {
    //Esta función se encargará de filtrar los eventos según las categorías seleccionadas y el término de búsqueda ingresado por el usuario.
    let filterData = filterAndPrint(events)
    //aca se verifica si el arreglo filterData es vacío o no. Si es vacío, se muestra un mensaje indicando que no se encontraron eventos que coincidan con los criterios de búsqueda. En caso contrario, se continúa con la siguiente instrucción.
    if (filterData.length === 0) {
        //Si el arreglo filterData no es vacío, se vacía el contenido del elemento cardsContainer para eliminar las tarjetas de eventos antiguas y se llama a la función createEventsCard para crear nuevas tarjetas de eventos para cada evento que se encuentra en filterData.
        cardsContainer.innerHTML =
            `
        <h4>Event not found.</h4>
        `
    } else {
        cardsContainer.innerHTML = "";
        createEventsCard(filterData, cardsContainer);
    }
})

$search.addEventListener('keyup', () => {
    let filterData = filterAndPrint(events)
    if (filterData.length === 0) {
        cardsContainer.innerHTML =
            `
        <h4>Event not found.</h4>
        `
    } else {
        cardsContainer.innerHTML = "";
        createEventsCard(filterData, cardsContainer);
    }
})
/*en este paso, se actualiza dinámicamente la lista de eventos en la página web cada vez que el usuario escribe en el campo de búsqueda, filtrando los eventos según las categorías seleccionadas y mostrando solo aquellos eventos que coinciden con los criterios de búsqueda seleccionados por el usuario. */