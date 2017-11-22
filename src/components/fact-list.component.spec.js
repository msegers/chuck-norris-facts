import FactList from './fact-list.component.vue';
import FactService from '../services/fact.service'
import Vue from "vue";

describe("FactListTest", () => {
    let factList;

    beforeEach(() => {
        factList = new Vue(FactList).$mount();
    });

    it("Should be a Vue Component", () => {
        expect(factList._isVue).toBe(true);
    });

    it("Should call factsService.loadFacts when button is clicked", () => {
        spyOn(FactService, 'loadFacts');

        FactService.loadFacts.and.callFake(() => { return []; });

        let button = factList.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        expect(FactService.loadFacts.calls.count()).toBe(1);
        //clear spy
        FactService.loadFacts.and.callThrough();
    });

    it("When FactService emits data it should be set as facts property and rendered in view", () => {
        spyOn(FactService, 'loadFacts');
        let jokeList = [{id: 1, joke: 'funny'}, {id: 2, joke: 'joke'}];

        FactService.emit(jokeList);

        expect(factList.randomFacts).toEqual(jokeList);

        Vue.nextTick(function () {
            let listItems = factList.$el.querySelectorAll('.list-item');
            expect(listItems.length).toBe(2);
            expect(listItems[0].textContent.trim()).toContain("funny");
            expect(listItems[0].textContent.trim()).toContain("1");
            expect(listItems[0].textContent.trim()).not.toContain("joke");
            expect(listItems[0].textContent.trim()).not.toContain("2");
            expect(listItems[1].textContent.trim()).toContain("joke");
            expect(listItems[1].textContent.trim()).toContain("2");
            expect(listItems[1].textContent.trim()).not.toContain("funny");
            expect(listItems[1].textContent.trim()).not.toContain("1");

        });
    });
});
