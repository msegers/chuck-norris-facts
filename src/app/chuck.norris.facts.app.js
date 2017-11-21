import Vue from 'vue';
import FactList from '../components/fact-list.component.vue'

export let ChuckNorrisFactsApp = new Vue({
    el: '#chuck-norris-facts',
    components: {
        'cnf-fact-list': FactList
    }
});
