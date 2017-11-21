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
        console.log('todo');
    }

    emit(value) {
        this.subscriptions.forEach((cb) => {
            cb(value);
        })
    }
}

export default new FactService();