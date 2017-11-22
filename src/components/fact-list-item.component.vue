<template>
    <div class="fact-list-item">
        <span class="meta">
            <span>{{ fact.id }}</span>
            <button class="favourite" @click="favourite(fact.id)"></button>
        </span>
        <span class="joke" v-html="fact.joke"></span>
    </div>
</template>

<script>
    import FactService from '../services/fact.service';

    export default {
        name: 'cnf-fact-list-item',
        props: {
            fact: {
                default: () => { return {id: '', joke: '' } }, type: Object},
        },
        methods: {
            favourite(id) {
                FactService.setFavouriteFact(id);
            }
        }
    }
</script>

<style>
    .fact-list-item {
        padding:2px;
        vertical-align: middle;
        display:flex;
        border: 1px solid #000;
        border-width: 1px 0 0 0;
    }
    .fact-list-item span {
        font-size:20px;
    }
    .fact-list-item span.meta {
        font-weight: 100;
        padding-right:8px;
        vertical-align: top;
    }
    .fact-list-item > span.meta > span {
        display:block;
        font-size: 10px;
        padding-bottom:4px;
        color: #333;
    }
    .fact-list-item > span.meta > span:before {
        content: '#';
    }
    .favourite {
        font-size:24px;
        height:24px;
        padding:0;
        border:0;
        background:transparent;
    }
    .favourite:before {
        font-family: "Material Icons";
        content: '\e87e';
    }
    .favourite.active:before, .favourite:hover:before {
        font-family: "Material Icons";
        content: '\e87d';
    }
</style>