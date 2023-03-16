let events = []
let currentDate = ""
fetch('assets/js/amazing.json')
  .then(response => response.json())
  .then(newData => {
    events = newData.events
    currentDate = newData.currentDate
    
   createEventCards(events, containerCards);
   

  })
  
  .catch(error => 
    console.error(error));

