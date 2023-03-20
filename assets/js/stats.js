

let categories = [];

let events = [];

let currentDate;


//creamos la tabla para Events Statistics

let tableEventsStatistics = document.getElementById("tableEventsStatistics");

async function getNewData() {
    try {
        let apiUrl = '/assets/js/amazing.json'
        let response = await fetch(apiUrl);
        let newData = await response.json();
        console.log(getNewData);
        events = newData.events;
        currentDate = newData.currentDate;
        categories = createCategories(events);
        let maxAttendanceEvent = events.sort((a, b) => ((b.assistance) / (b.capacity)) - ((a.assistance) / (a.capacity)))[0];
        let minAttendanceEvent = events.sort((a, b) => ((a.assistance) / (a.capacity)) - ((b.assistance) / (b.capacity)))[0];
        let capacityEvent = maxCapacityEvent(events);
        addFile(maxAttendanceEvent.name, 
                minAttendanceEvent.name,
                capacityEvent.name, 
                tableEventsStatistics);
        createTbodyUpcomingEvents(events, categories, currentDate)
        createTbodyPastEvents(events, categories, currentDate)

    }
    catch (error) {
        console.log(error);
    }
}
getNewData()


const createCategories = (newData) => {
    let categories = newData.map(category => category.category)
    let categoriesUnrepeat = [...(new Set(categories))]
    return categoriesUnrepeat
}


function maxCapacityEvent(events) {
    let capacityEvent = events.sort((a, b) => b.capacity - a.capacity);
    return capacityEvent[0];
}

//agregamos los row

function addFile(row1, row2, row3, container) {
    let newRow = document.createElement("tr");
    let rowA = document.createElement("td");
    let rowB = document.createElement("td");
    let rowC = document.createElement("td");

    rowA.textContent = `${row1}`;
    rowB.textContent = `${row2}`;
    rowC.textContent = `${row3}`;

    newRow.appendChild(rowA);
    newRow.appendChild(rowB);
    newRow.appendChild(rowC);
    container.appendChild(newRow);
}


//creamos la tabla para Upcoming Events

function createTbodyUpcomingEvents(events, categories, currentDate) {
    let tbodyUpcomingEvents = document.getElementById("upcomingEventsByCategory");
    categories.forEach(category => {
        let filteredEvents = events.filter((event) => event.category === category).filter((event) => event.date < currentDate)
        let eventsRevenueEstimate = 0;
        let eventPerCategory = 0;
        for (let i = 0; i < filteredEvents.length; i++) {
            eventsRevenueEstimate += filteredEvents[i].price * filteredEvents[i].assistance;
            eventPerCategory+= 1;
        }
        let eventsPercentageAtt = 0;
        filteredEvents.forEach(event => {
            let eventAtt = ((event.assistance*100)/event.capacity)/eventPerCategory;
            eventsPercentageAtt += eventAtt;
        }
        )
        let newObject = {
            name: category,
            quantity: eventPerCategory,
            revenue: `$${eventsRevenueEstimate}`,
            attendance: `${eventsPercentageAtt.toFixed(2)}%`,  
        }
        addFile(newObject.name, newObject.revenue, newObject.attendance, tbodyUpcomingEvents );
    })

}

//creamos la tabla para Past Events

function createTbodyPastEvents(events, categories, currentDate) {
    let tbodyPastEvents = document.getElementById("pastEventsByCategory");
    categories.forEach(category => {
        let filteredEvents = events.filter((event) => event.category === category).filter((event) => event.date > currentDate)
        let eventsRevenueEstimate = 0;
        let eventPerCategory = 0;
        for (let i = 0; i < filteredEvents.length; i++) {
            eventsRevenueEstimate += filteredEvents[i].price * filteredEvents[i].estimate;
            eventPerCategory+= 1;
        }
        let eventsPercentageAtt = 0;
        filteredEvents.forEach(event => {
            let eventAtt = ((event.estimate*100)/event.capacity)/eventPerCategory;
            eventsPercentageAtt += eventAtt;
        }
        )
        let newObject = {
            name: category,
            quantity: eventPerCategory,
            revenue: `$${eventsRevenueEstimate}`,
            attendance: `${eventsPercentageAtt.toFixed(2)}%`,  
        }
        addFile(newObject.name, newObject.revenue, newObject.attendance, tbodyPastEvents);
    })
}



