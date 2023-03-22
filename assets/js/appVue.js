Vue.config.productionTip = true;


import App from 'assets/js/appVue.js';
import { categories, events, createEventsCategories, createEventsCard, createEventsCheckboxes } from 'assets/js/indexFetch.js';

Vue.component('event-list', {
  props: ['events'],
  mounted() {
    createEventsCard(this.events, document.getElementById("container-cards"));
    createEventsCheckboxes(categories, document.getElementById("checkboxes"));
  },
  template: `
    <div>
      <div v-for="event in events" :key="event.id">
        <h2>{{ event.name }}</h2>
        <p>{{ event.date }}</p>
        <p>{{ event.description }}</p>
        <p>{{ event.category }}</p>
        <p>{{ event.place }}</p>
        <p>Capacity: \${{ event['capacity'] }}</p>
        <p>Assistance: \${{ event['assistance'] }}</p>
        <p>Price: \${{ event['price'] }}</p>
        <a :href="'../pages/details.html?id=' + event._id" class="btn btn-events">Show Details</a>
      </div>
    </div>
  `
});

new Vue({
  el: '#app',
  computed: {
    categories: () => categories,
    events: () => events,
  },
  methods: {
    createEventsCategories: createEventsCategories,
    createEventsCard: createEventsCard,
    createEventsCheckboxes: createEventsCheckboxes
  },
  render: h => h(App),
});


Vue.config.productionTip = false;
