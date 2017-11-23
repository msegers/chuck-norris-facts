// TODO: Can we test this?
class DatabaseService {
    constructor() {
        this.readyResolve = null;
        this.readyReject = null;

        this.connection = window.indexedDB.open("ChuckNorrisFactsDB", 1);
        this.connection.onerror = (evt) => this.onError(evt);
        this.connection.onsuccess = (evt) => this.onSuccess(evt);
        this.db = null;
        this.connection.onupgradeneeded = (evt) => this.onUpgrade(evt);
        this.FACTS = 'facts';
    }

    ready () {
        return new Promise((resolve, reject) => {
            this.readyResolve = resolve;
            this.readyReject = reject;
        });
    }

    onError(event) {
        this.readyReject();
        alert('Well now, don\'t expect me to store your favorites without a database!')
    }

    onSuccess(event) {
        this.db = event.target.result;
        this.readyResolve();
    }

    onUpgrade(event) {
        this.db = event.target.result;
        try {
            this.db.deleteObjectStore(this.FACTS);
        } catch(e) {
            //TODO: well now, that is not very UX friendly
        }
    }

    addFavourite(fact) {
        return new Promise((resolve,reject) => {
            var r = this.createTransaction(true).put(fact);;
            r.onsuccess = () => {
                resolve();
            };
            r.onerror = err => {
                reject(err);
            };
        });
    }

    removeFavorite(fact) {
        return new Promise((resolve,reject) => {
            var r = this.createTransaction(true).delete(fact.id);;

            r.onsuccess = () => {
                resolve();
            };
            r.onerror = err => {
                reject(err);
            };
        });
    }

    getFavourites() {
        return new Promise( (resolve, reject) => {
            var r = this.createTransaction().getAll();

            r.onsuccess = function() {
                resolve(event.target.result);
            };

            r.onerror = err => {
                reject(err);
            };

        });
    }

    createTransaction(write) {
        return this.db.transaction(this.FACTS, write ? 'readwrite' : 'readonly').objectStore(this.FACTS);
    }
}

export default new DatabaseService();