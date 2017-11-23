<template>
   <div>
      <dialog :open="!isLoggedIn">
         <cnf-login-dialog />
      </dialog>
      <div class="dialog-backdrop" v-if="!isLoggedIn"></div>
      <div class="fact-list" v-bind:class="{ hidden: !isLoggedIn }">
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
   </div>
</template>

<script>
   import FactService from '../services/fact.service';
   import SessionService from '../services/session.service';
   import CnfFactListItem from "./fact-list-item.component.vue";
   import CnfLoginDialog from './login-dialog.component.vue';

   let toggleActiveText = "Disable adding random favorites";
   let toggleInactiveText = "Add random favorites";

   export default {
       components: {
           CnfFactListItem,
           CnfLoginDialog
       },
       name: 'cnf-fact-list',
       data: () => {
           return {
               randomFacts: [],
               favoriteFacts: [],
               randomFavoriteActive: false,
               toggleRandomText: '',
               dialog: null,
               isLoggedIn: true
           }
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
           SessionService.subscribe(isLoggedIn => {
               this.isLoggedIn = isLoggedIn;
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
   dialog {
      z-index: 10;
      background:white;
   }
   /* it seems that ::backdrop is not working in chrome as is, maybe because of being a vue component? */
   .dialog-backdrop {
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      width: 100vw;
      background: rgba(127,127,127,0.5);
   }

   .hidden {
      display:none;
   }
</style>