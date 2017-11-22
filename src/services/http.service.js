class HttpService {

    constructor() {
        this.headers = new Headers();
    }

    get(url) {
        return fetch(url, {method: 'GET', headers: this.headers}).then(response => {
            console.log(response, response.ok);
            if (response.ok) {
                return response.json();
            }
            throw new Error('The request to ' + url + 'was unsuccessfull');
        });
    }

}

export default new HttpService();