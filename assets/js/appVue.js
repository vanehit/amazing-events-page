Vue.config.productionTip = true;



import { categories, events, createEventsCategories, createEventsCard, createEventsCheckboxes } from '../js/indexFetch.js';

Vue.component('event-list', {
  props: ['events'],
  mounted() {
    createEventsCard(this.events, document.getElementById("container-cards"));
    createEventsCheckboxes(categories, document.getElementById("checkboxes"));
  },
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
