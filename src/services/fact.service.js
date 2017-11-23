import HttpService from './http.service';
import DatabaseService from './database.service';

class FactService {
    constructor() {
        this.URL_10_FACTS = 'http://api.icndb.com/jokes/random/10';
        this.URL_1_FACT = 'http://api.icndb.com/jokes/random/1';
        this.FAVORITE = 'favorite';
        this.RANDOM = 'random';
        this.randomSubscriptions = new Map();
        this.favoriteSubscriptions = new Map();
        this.subscriptionCounter = 0; //includes unsubscribed randomSubscriptions
        this.facts = [];
        this.favorites = [];
        this.addRandomFavorite = false;
        this.addRandomTimer = 0;
        DatabaseService.ready().then(() => {
            this._loadFavourites();
        });
    }

    subscribe(set, callback) {
        if (set === this.RANDOM) {
            this.randomSubscriptions.set(++this.subscriptionCounter, callback);
            callback(this.facts);
        } else if (set === this.FAVORITE) {
            this.favoriteSubscriptions.set(++this.subscriptionCounter, callback);
            callback(this.favorites);
        }
        return this.subscriptionCounter; // See comment on top
    }

    unsubscribe(subscriptionId) {
        this.randomSubscriptions.delete(subscriptionId);
        this.favoriteSubscriptions.delete(subscriptionId);
    }

    loadFacts() {
        HttpService.get(this.URL_10_FACTS).then(response => {
            this.facts = response.value;
            this._loadFavourites();
        });
    }

    toggleFavouriteFact(id) {
        let fact = this.facts.find(f => f.id === id);
        return new Promise((resolve, reject) => {
            let existingFavorite = this.favorites.find(f => f.id === id);
            if (fact && this.favorites.length < 10 && !existingFavorite) {
                fact.favorite = true;
                DatabaseService.addFavourite(fact)
                    .then(() => { this._loadFavourites(); })
                    .catch(err => { reject(err); });
            } else if (existingFavorite) {
                DatabaseService.removeFavorite(existingFavorite).then(() => { this._loadFavourites() });
            } else {
                reject("Only 10 favorites can be added");
            }
        });
    }

    toggleRandomFavorite() {
        this.addRandomFavorite = !this.addRandomFavorite;
        if (!this.addRandomFavorite || this.favorites.length >= 10) {
            clearInterval(this.addRandomTimer);
        } else {
            clearInterval(this.addRandomTimer);
            this.addRandomTimer = setInterval(() => this._addRandomFavorite(), 2000);
        }
    }

    _addRandomFavorite() {
        if (this.favorites.length < 10) {
            HttpService.get(this.URL_1_FACT).then(response => {
                let fact = response.value[0];
                //in the case someone added it during the request
                if (this.favorites.length < 10)
                DatabaseService.addFavourite(fact)
                    .then(() => {
                        this._loadFavourites();
                    });
            });
        } else {
            this.addRandomFavorite = false;
            clearInterval(this.addRandomTimer);
        }
    }

    _emit(set, value) {
        if (set === this.RANDOM) {
            this.randomSubscriptions.forEach((cb) => {
                cb(value);
            })
        } else if (set === this.FAVORITE) {
            this.favoriteSubscriptions.forEach((cb) => {
                cb(value);
            })
        }
    }

    _loadFavourites() {
        DatabaseService.getFavourites().then(favorites => {
            this.favorites = favorites.map(f => { f.favorite = true; return f;});
            this.facts.forEach(fact => {
                let favorite = this.favorites.find(f => f.id === fact.id);
                fact.favorite = !!favorite;
            });

            this._emit(this.RANDOM, this.facts);
            this._emit(this.FAVORITE, this.favorites);
        });
    }
}

export default new FactService();