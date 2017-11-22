<template>
   <div class="fact-list">
      <button @click="loadFacts">Load Chuck Norris Facts</button>
      <ul class="random-list">
         <li v-for="fact in randomFacts" class="list-item">
            <cnf-fact-list-item v-bind:fact="fact"></cnf-fact-list-item>
         </li>
      </ul>

      <ul class="favourite-list">
         <li v-for="fact in favoriteFacts" class="list-item">
            <cnf-fact-list-item v-bind:fact="fact"></cnf-fact-list-item>
         </li>
      </ul>
   </div>
</template>

<script>
   import FactService from '../services/fact.service';
   import CnfFactListItem from "./fact-list-item.component.vue";

   export default {
       components: {CnfFactListItem},
       name: 'cnf-fact-list',
       data: () => {
           return { randomFacts: [], favoriteFacts: [] }
       },
       methods: {
           loadFacts() {
               FactService.loadFacts();
           }
       },
       //we need ye-olde function notation for the proper this scope (otherwise it's the parent scope)
       created: function () {
           FactService.subscribe(facts => {
               this.randomFacts = facts;
           });
       }
   }
</script>

<style>
   ul, li {
    list-style:none;
    padding:0; margin:0;
   }
   li {
      margin-bottom:4px;
   }
</style>