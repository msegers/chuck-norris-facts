import HelloWorld from './hello-world.component';
import Vue from "vue";

describe("HelloWorldTest", () => {
    let cmp, vm;

    beforeEach(() => {
        cmp = Vue.extend(HelloWorld);
    });

    it("Should be a Vue Component", () => {
        expect(new cmp()._isVue).toBe(true);
    });
});
