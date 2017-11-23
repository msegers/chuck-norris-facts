import FactService from './fact.service';

describe("FactServiceTest", () => {
    let factService;

    beforeEach(() => {
        // instantiate directly after extend
        factService = FactService;
    });

    it('Should be able to sub and unsubscribe', () => {
        expect(factService.randomSubscriptions.size).toBe(0);
        let subscriptionId = factService.subscribe(FactService.RANDOM, () => {});
        expect(factService.randomSubscriptions.size).toBe(1);
        factService.unsubscribe(subscriptionId);
        expect(factService.randomSubscriptions.size).toBe(0);
    });

    it('Should only _emit when subscribed - random events', () => {
        let value = undefined;
        factService._emit(FactService.RANDOM, [1]);
        expect(value).not.toEqual([1]);
        let subscriptionId = factService.subscribe(FactService.RANDOM, val => {
            value = val
        });
        factService._emit(FactService.RANDOM, [1]);
        expect(value).toEqual([1]);
        factService.unsubscribe(subscriptionId);
        factService._emit(FactService.RANDOM, [2]);
        expect(value).toEqual([1]);
    });

    it('Should only _emit when subscribed - favorite events', () => {
        let value = undefined;
        factService._emit(FactService.FAVORITE, [1]);
        expect(value).not.toEqual([1]);
        let subscriptionId = factService.subscribe(FactService.FAVORITE, val => {
            value = val
        });
        factService._emit(FactService.FAVORITE, [1]);
        expect(value).toEqual([1]);
        factService.unsubscribe(subscriptionId);
        factService._emit(FactService.FAVORITE, [2]);
        expect(value).toEqual([1]);
    });

    it('Should reject adding a favorite if list is already at 10 items', () => {
        factService.favorites = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10}];
        factService.facts.push({id: 20, favorite: false, joke: 'hoi'});
        factService.toggleFavouriteFact(20).then(() => {
            fail('should not have success');
        }).catch(err => {
            expect(err).toEqual("Only 10 favorites can be added");
        })
    });

    it('Should reject adding a favorite if id is not found', () => {
        factService.favorites = [];
        factService.facts = [];
        factService.toggleFavouriteFact(20).then(() => {
            fail('should not have success');
        }).catch(err => {
            expect(err).toEqual("Only 10 favorites can be added");
        })

    });

    it('Should remove an item if it is in favorites list', () => {
       factService.favorites = [{id: 20, favorite: false, joke: 'hoi'}];
        factService.toggleFavouriteFact(20).then(() => {
            expect(factService.favorites).toEqual([]);
        }).catch(() => {
            fail('should not throw')
        })
    });

});
