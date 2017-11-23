<template>
    <div class="dialog" id="login_dialog">
        <h3>Login</h3>
        <span class="label">Username:</span>
        <input type="text" name="username" v-model="username">
        <span class="label">Password:</span>
        <input type="password" name="password" v-model="password">
        <button @click="login" type="button">Login</button>
        <ul class="errors">
            <li v-for="e in errors">
                {{e}}
            </li>
        </ul>
    </div>
</template>

<script>
    import SessionService from '../services/session.service';

    export default {
        name: 'cnf-login-dialog',
        data: () => {
            return {
                errors: [],
                username: '',
                password: ''
            }
        },
        methods: {
            containsConsecutiveCharacters(str) {
                for (let i = 0; i <= str.length - 3; i++) {
                    var allthree = str[i] + str[i + 1] + str[i + 2];
                    let s1 = str.charCodeAt(i);
                    let s2 = str.charCodeAt(i + 1);
                    let s3 = str.charCodeAt(i + 2);
                    if (
                        /[a-zA-Z]+$/.test(allthree) &&
                        (s1 < s2 && s2 < s3 && s1+s2+s3-(3*s1) === 3)
                    ) {
                        return true;
                    }
                }
            },
            containsCharactersWhichCanBeConfusedWithOther(str) {
                return /[iOl]/.test(str);
            },
            containsAtLeastTwoConsecutiveSameCharacters(str) {
                return /(\w)\1+/.test(str);
            },
            containsOnlylowerCaseCharacters(str) {
                return /^[a-z]+$/.test(str);
            },
            login() {
                this.errors = [];
                if (!this.containsConsecutiveCharacters(this.password)) {
                    this.errors.push('Password requires consecutive characters e.g. abc or def')
                }
                if (this.containsCharactersWhichCanBeConfusedWithOther(this.password)) {
                    this.errors.push('Password should not contain the characters iO or l (Isaac, capital Olaf, lower Lionel).');
                }
                if (!this.containsAtLeastTwoConsecutiveSameCharacters(this.password)){
                    this.errors.push('Password should contain at least 2 the same characters next to each e.g. aa or zzz');
                }
                if (this.password.length > 32) {
                    this.errors.push('Password should be less than 33 characters');
                }
                if (!this.containsOnlylowerCaseCharacters(this.password)) {
                    this.errors.push('Password should be lowercase only');
                }

                if (this.errors.length === 0) {
                    SessionService.setLoggedIn(true);
                } else {
                }
            },
        }
    }
</script>

<style>
    span.label {
        display:block;
        font-weight:bold;
    }
    h3 {
        margin:0 0 8px; padding:0;
    }
    input {
        display:block;
        margin: 4px 0 4px 0;
    }
</style>