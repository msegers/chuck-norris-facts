class SessionService {
    constructor() {
        this.LOGIN_STATUS = "login_status_CNF";
        this.isLoggedIn = this.getLoginStatus();
        this.subscribers = [];
    }

    subscribe(func) {
        this.subscribers.push(func);
        func(this.isLoggedIn);
    }

    getLoginStatus() {
        return sessionStorage.getItem(this.LOGIN_STATUS) === "1";
    }

    setLoggedIn(bool) {
        sessionStorage.setItem(this.LOGIN_STATUS, bool ? '1' : '0');
        this.isLoggedIn = !!bool;
        this.subscribers.forEach(cb => {
            cb(this.isLoggedIn);
        })
    }

}

export default new SessionService();