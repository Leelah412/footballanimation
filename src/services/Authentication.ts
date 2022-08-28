import { authentication } from "./API";

export default {

    async login(username: string, password: string, rememberMe: boolean = false): Promise<any>{

        return await authentication()
        .post('login', {
            username,
            password
        })
        .then(res => {
            if(!("accessToken" in res.data)) return Promise.reject("Internal Server Error");
            if(!("refreshToken" in res.data)) return Promise.reject("Internal Server Error");

            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            // to let vue know, that someone is in fact logged in, we need to change some variables inside the store
            // but for that, we need access to the store, and doing it from some *.js file would be a pain in the ass
            // thats why we will have to do it inside "Login.vue"
            return Promise.resolve(res.data);
/*             return {
                isError: false,
                data: res.data                  // expecting to get access and refresh jwt tokens in "res.data"
            }; */
        })
        .catch(err => {
            return Promise.reject(err);
/*             return {
                isError: true,
                data: err.response.data
            }; */
        });
    },

    registration(username: string, email: string, password: string){
        
        return authentication().post('registration', {
            username,
            email,
            password
        });
    },

    requestReset(email: string){
        return authentication().post('requestReset', {email});
    },

    // supposed to be called in App.vue in the "beforeMount" method to check, if a user was already logged in, so they dont have to do it again
    // returns a dictionary with boolean "loggedIn" and dictionary object "account" containing all necessary data for the "account" state in the store
    isLoggedIn(){
        // check, if user is connected
        var accessToken = localStorage.getItem("accessToken");
        if(accessToken == null) return;
        // check, if token is valid
        // if yes, apply user information inside "accessToken" to the stores "account" entry and set "loggedIn" to true

        // if not, check, whether its because the token is expired or because it's invalid

        // if invalid, inform user, that he should scan his PC for viruses, as "accessToken exists, but it has been tampered with"

        // if expired, get the refresh token

        // if refresh token is valid, get new access token, apply user information inside "accessToken" to the stores "loginState" entry and set "loggedIn" to true

        // if none of the above apply, it means no one is logged in
        return {
            loggedIn: false,
            account: {}
        }
    }
}