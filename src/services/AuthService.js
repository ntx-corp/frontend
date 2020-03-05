import config from '../utils/config';

export const AuthService = {
    /*login: function(username, password){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }
        return fetch(`${config.apiUrl}/auth/login`, requestOptions)
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            });
    },
    getUserInfo: function(){
        return JSON.parse(localStorage.getItem("user"));
    },
    */
    getAuthHeader: function() {
        return {headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}};
    },
    logout: function() {
        // remove user from local storage to log user out
        localStorage.clear();
        // localStorage.removeItem('user');
    },
    getToken: function(){
        return localStorage.getItem("token")
    },
    getUser:function(){
        return fetch(`${config.apiUrl}/auth`,{
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")},
                // body: JSON.stringify({ username, password })
            })
            .then(respone=>respone.json())
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                return res.data;
            });
    }
};

