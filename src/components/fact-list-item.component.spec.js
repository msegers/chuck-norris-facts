import FactListItem from './fact-list-item.component.vue';
import FactService from '../services/fact.service';
import Vue from 'vue';

describe('FactListItemTest', () => {
    let factListItem;

    beforeEach(() => {
        factListItem = new Vue(FactListItem).$mount();
    });

    it('Should be a Vue Component', () => {
        expect(factListItem._isVue).toBe(true);
    });

    //If the following two tests fail, then someone added text to the html!
    it('Should render id text', () => {
        factListItem.fact = {id: 666};
        Vue.nextTick(function () {
            expect(factListItem.$el.textContent.trim()).toEqual('666');
        });
    });

    it('Should render joke text', () => {
        factListItem.fact = {joke: 'This is the best joke'};
        Vue.nextTick(function () {
            expect(factListItem.$el.textContent.trim()).toEqual('This is the best joke');
        });
    });

    it('Should call setFavouriteJoke on factService when clicking favourite button', () => {
        spyOn(FactService, 'setFavouriteFact');

        FactService.setFavouriteFact.and.callFake(() => {
           return new Promise((resolve, reject) => {
               reject();
           })
        });

        let button = factListItem.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        // clear spy
        FactService.setFavouriteFact.and.callThrough();

    });
});
