import SessionService from './session.service';

describe("SessionServiceTest", () => {
    let sessionService;

    beforeEach(() => {
        // instantiate directly after extend
        sessionService = SessionService;
    });

    it('Should be able to subscribe', () => {
        expect(sessionService.subscribers.length).toBe(0);
        sessionService.subscribe(() => {});
        expect(sessionService.subscribers.length).toBe(1);
        sessionService.subscribers.length = 0;
    });

    it('Should be able to set status to loggedIn', () => {
        expect(sessionService.getLoginStatus()).toBe(false);
        sessionService.setLoggedIn(true);
        expect(sessionService.getLoginStatus()).toBe(true);
        sessionService.setLoggedIn(false);
    });

    it('Should get an update when subscribed and login happens', () => {
        let loginStatus = false;
        sessionService.subscribe(status => {
            loginStatus = status;
        });
        expect(loginStatus).toBe(false);
        sessionService.setLoggedIn(true);
        expect(loginStatus).toBe(true);
        sessionService.setLoggedIn(false);
        sessionService.subscribers.length = 0;
    });
});
