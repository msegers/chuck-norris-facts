import LoginDialog from './login-dialog.component.vue';
import SessionService from '../services/session.service';
import Vue from 'vue';

describe('LoginDialog', () => {
    let loginDialog;

    beforeEach(() => {
        SessionService.setLoggedIn(false);
        loginDialog = new Vue(LoginDialog).$mount();
    });

    afterEach(() => {
        SessionService.setLoggedIn(false);
    });

    it('Should be a Vue Component', () => {
        expect(loginDialog._isVue).toBe(true);
    });

    it('Should have username & password binding on input boxes', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'invalidPW';

        Vue.nextTick(() => {
           expect(loginDialog.$el.querySelector('input[name=username]').value).toEqual('CheekyBreeky');
           expect(loginDialog.$el.querySelector('input[name=password]').value).toEqual('invalidPW');
        });
    });

    it('Should validate the input of the password on button click - not containing 3 increasing characters', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'cbaacdfhg';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        Vue.nextTick(() => {
            let errorContent = loginDialog.$el.querySelector('.errors').textContent;
            expect(errorContent)
                .toContain('Password requires consecutive characters e.g. abc or def');
        });
    });

    it('Should validate the input of the password on button click - containing straight of three letters', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'abc';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        Vue.nextTick(() => {
            let errorContent = loginDialog.$el.querySelector('.errors').textContent;
            expect(errorContent)
                .not.toContain('Password requires consecutive characters e.g. abc or def');
        });
    });

    it('Should validate the input of the password on button click - can not contain l', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'Grote lekkerbekjes';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        Vue.nextTick(() => {
            let errorContent = loginDialog.$el.querySelector('.errors').textContent;
            expect(errorContent)
                .toContain('Password should not contain the characters iO or l (Isaac, capital Olaf, lower Lionel).');

        });
    });

    it('Should validate the input of the password on button click - can not contain O', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'Orval Stroganoff';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        Vue.nextTick(() => {
            let errorContent = loginDialog.$el.querySelector('.errors').textContent;
            expect(errorContent)
                .toContain('Password should not contain the characters iO or l (Isaac, capital Olaf, lower Lionel).');

        });
    });

    it('Should validate the input of the password on button click - can not contain i', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'internet of things';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        Vue.nextTick(() => {
            let errorContent = loginDialog.$el.querySelector('.errors').textContent;
            expect(errorContent)
                .toContain('Password should not contain the characters iO or l (Isaac, capital Olaf, lower Lionel).');

        });
    });
    it('Should validate the input of the password on button click - needs pair of character', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'abdefasdfa';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        Vue.nextTick(() => {
            let errorContent = loginDialog.$el.querySelector('.errors').textContent;
            expect(errorContent)
                .toContain('Password should contain at least 2 the same characters next to each e.g. aa or zzz');

        });
    });

    it('Should validate the input of the password on button click - is ok if contains pair of character', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'abdefaasdfa1412';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        Vue.nextTick(() => {
            let errorContent = loginDialog.$el.querySelector('.errors').textContent;
            expect(errorContent)
                .not.toContain('Password should contain at least 2 the same characters next to each e.g. aa or zzz');

        });
    });

    it('Should validate the input of the password on button click - password should be less than 33 char', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'abcdefghijklmnopqrstuvwxyzabcdefg';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        Vue.nextTick(() => {
            let errorContent = loginDialog.$el.querySelector('.errors').textContent;
            expect(errorContent)
                .toContain('Password should be less than 33 characters');

        });
    });

    it('Should validate the input of the password on button click - password should be ok if less than 33 char', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'abcdefghijklmnopqrstuvwxyzabcdef';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        Vue.nextTick(() => {
            let errorContent = loginDialog.$el.querySelector('.errors').textContent;
            expect(errorContent)
                .not.toContain('Password should be less than 33 characters');

        });
    });

    it('Should validate the input of the password on button click - error if password is not fully lowercase', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'abcD1';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        Vue.nextTick(() => {
            let errorContent = loginDialog.$el.querySelector('.errors').textContent;
            expect(errorContent)
                .toContain('Password should be lowercase only');

        });
    });

    it('Should validate the input of the password on button click - password should be fully lowercase', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'ab1c';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        Vue.nextTick(() => {
            let errorContent = loginDialog.$el.querySelector('.errors').textContent;
            expect(errorContent)
                .not.toContain('Password should lowercase only');

        });
    });

    it('Should not log the user in if the password is invalid', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'ab1c';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        expect(SessionService.getLoginStatus()).toBe(false);
    });

    it('Should log the user in if the password is valid', () => {
        loginDialog.username = 'CheekyBreeky';
        loginDialog.password = 'abcbcdeff';

        loginDialog.$el.querySelector('button');

        let button = loginDialog.$el.querySelector('button');
        let clickEvt = new window.Event('click');
        button.dispatchEvent(clickEvt);

        expect(SessionService.getLoginStatus()).toBe(true);
    });
});