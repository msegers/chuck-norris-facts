<template>
   <div class="fact-list-component">
   <button @click="loadFacts">Load Chuck Norris Facts</button>
   {{ facts }}
   </div>
</template>

<script>
   import FactService from '../services/fact.service';

   export default {
       name: 'cnf-fact-list',
       data: () => {
           return { facts: [] }
       },
       methods: {
           loadFacts() {
               FactService.loadFacts();
           }
       },
       //we need this, so we shouldn't use arrow functions
       created: function () {
           FactService.subscribe(facts => {
               this.facts = facts;
           });
       }
   }
</script>