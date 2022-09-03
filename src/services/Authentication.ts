import API, { authentication } from "./API";

export default {

    async login(username: string, password: string, rememberMe: boolean = false): Promise<any>{

        return await authentication()
        .post('login', {
            username,
            password
        })
        .then(async res => {
            if(!("accessToken" in res.data)) return Promise.reject("Internal Server Error");
            if(!("refreshToken" in res.data)) return Promise.reject("Internal Server Error");

            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            var data = {}

            // get user information from server and store it in vuex
            await API().post(`/user/${username}`, {accessToken: res.data.accessToken, refreshToken: res.data.refreshToken})
            .then(res2 => {
                console.log("successfully got user data");
                data = res2.data;
            })
            .catch(err => {
                console.log("couldnt find user data, which should NOT happen at all, since user DOES exist!");
            });
            
            return data;
        })
        .catch(err => {
            console.log("ERROR:");
            
            console.log(err);
            
            return Promise.reject(err);
        });
    },

    // basically you just have to delete the tokens
    // TODO: maybe also send a logout request to the server, if we ever do session logs
    logout(){
        const refreshToken = localStorage.getItem('refreshToken');
        if(refreshToken !== null)
            authentication().delete('logout', {data: {refreshToken}});

        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');
    },

    registration(username: string, email: string, password: string){
        
        return authentication().post('registration', {
            username,
            email,
            password
        });
    },

    requestReset(email: string){
        return authentication().post('request-reset', {email});
    },

    // call this to continue a previous session after a reload, if possible
    async restoreSession(){
        const refreshToken: string | null = localStorage.getItem('refreshToken');
        if(refreshToken === null || refreshToken === '') return Promise.reject("Nothing, there just isn't a user logged in");

        return await authentication().post('restore-session', {refreshToken: refreshToken})
        .then(async res => {

            if(typeof res.data.username !== 'string')
                return Promise.reject('Internal Server Error');
            if(typeof res.data.accessToken !== 'string')
                return Promise.reject('Internal Server Error');
            
            var data = {}
            console.log("username: ", res.data.username);
            // save new access token in storage
            localStorage.setItem('accessToken', res.data.accessToken);

            // get user information from server and store it in vuex
            await API().post(`/user/${res.data.username}`, {accessToken: res.data.accessToken})
            .then(res2 => {
                console.log("successfully got user data");
                data = res2.data;
            })
            .catch(err => {
                console.log("couldnt find user data");
            });
            
            return data;
        })
        .catch(err => {
            return Promise.reject(err);
        })
    },
    
}