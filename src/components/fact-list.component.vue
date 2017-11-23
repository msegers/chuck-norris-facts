<template>
   <div class="fact-list">
      <button @click="loadFacts">Load Chuck Norris Facts</button>
      <button @click="toggleRandomFavorite" :disabled="favoriteFacts.length === 10">{{ toggleRandomText }}</button>
      <h2 v-if="randomFacts.length">Random facts</h2>
      <ul class="random-list">
         <li v-for="fact in randomFacts" class="list-item">
            <cnf-fact-list-item v-bind:fact="fact"></cnf-fact-list-item>
         </li>
      </ul>
      <h2 v-if="favoriteFacts.length">Favorites</h2>
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
   let toggleActiveText = "Disable adding random favorites";
   let toggleInactiveText = "Add random favorites";

   export default {
       components: {CnfFactListItem},
       name: 'cnf-fact-list',
       data: () => {
           return { randomFacts: [], favoriteFacts: [], randomFavoriteActive: false, toggleRandomText: '' }
       },
       methods: {
           loadFacts() {
               FactService.loadFacts();
           },
           toggleRandomFavorite() {
               FactService.toggleRandomFavorite();
               this.toggleRandomText = this.getRandomAddButtonText();
           },
           getRandomAddButtonText() {
               if (this.favoriteFacts.length >= 10) {
                   return "Limit of favorites reached";
               }
               return FactService.addRandomFavorite ? toggleActiveText : toggleInactiveText;
           }
       },
       //we need ye-olde function notation for the proper this scope (otherwise it's the parent scope)
       created: function () {
           FactService.subscribe(FactService.RANDOM, facts => {
               this.randomFacts = facts;
           });
           FactService.subscribe(FactService.FAVORITE, facts => {
              this.favoriteFacts = facts;
              this.toggleRandomText = this.getRandomAddButtonText();
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