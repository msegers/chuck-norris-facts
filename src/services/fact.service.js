import HttpService from './http.service';

class FactService {

    constructor() {
        this.subscriptions = new Map();
        this.subscriptionCounter = 0; //includes unsubscribed subscriptions
        this.facts = [];
    }

    subscribe(callback) {
        this.subscriptions.set(++this.subscriptionCounter, callback);
        callback(this.facts);
        return this.subscriptionCounter; // See comment on top
    }

    unsubscribe(subscriptionId) {
        this.subscriptions.delete(subscriptionId);
    }

    loadFacts() {
        HttpService.get('http://api.icndb.com/jokes/random/10').then(response => {
            this.updateFacts(response.value);
        });
    }

    emit(value) {
        this.subscriptions.forEach((cb) => {
            cb(value);
        })
    }

    updateFacts(value) {
        this.facts = value;
        this.emit(value);
    }

    setFavouriteFact(id) {
        return new Promise((resolve, reject) => {
            reject("WIP");
        })
    }
}

export default new FactService();