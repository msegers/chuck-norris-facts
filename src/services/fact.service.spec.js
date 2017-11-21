import FactService from './fact.service';

describe("FactServiceTest", () => {
    let factService;

    beforeEach(() => {
        // instantiate directly after extend
        factService = FactService;
    });

    it("Should be able to sub and unsubscribe", () => {
        expect(factService.subscriptions.size).toBe(0);
        var subscriptionId = factService.subscribe(() => {});
        expect(factService.subscriptions.size).toBe(1);
        factService.unsubscribe(subscriptionId);
        expect(factService.subscriptions.size).toBe(0);
    });

    it("Should only emit when subscribed", () => {
        var value = undefined;
        factService.emit([1]);
        expect(value).not.toEqual([1]);
        var subscriptionId = factService.subscribe(val => {
            value = val
        });
        factService.emit([1]);
        expect(value).toEqual([1]);
        factService.unsubscribe(subscriptionId);
        factService.emit([2]);
        expect(value).toEqual([1]);
    });

});
