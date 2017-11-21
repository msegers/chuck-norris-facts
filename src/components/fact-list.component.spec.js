import FactList from './fact-list.component.vue';
import FactService from '../services/fact.service'
import Vue from "vue";

describe("FactListTest", () => {
    let factList;

    beforeEach(() => {
        // instantiate directly after extend
        factList = new Vue(FactList).$mount();
    });

    it("Should be a Vue Component", () => {
        expect(factList._isVue).toBe(true);
    });

    it("Should call factsService.loadFacts when loadFacts is called", () => {
        spyOn(FactService, 'loadFacts')

        FactService.loadFacts.and.callFake(() => { return []; });
        factList.loadFacts();

        expect(FactService.loadFacts.calls.count()).toBe(1);
        //clear spy
        FactService.loadFacts.and.callThrough();
    });

    it("When FactService emits data it should be set as facts property", () => {
        spyOn(FactService, 'loadFacts');
        let jokeList = [{joke: 'funny'}, {joke: 'joke'}];

        FactService.emit(jokeList);

        expect(factList.facts).toEqual(jokeList);
    });
});
