import config from '../utils/config';
import {AuthService as auth} from "./AuthService";

export const ApiService = {
    token:function(){

    },
    header:function(){
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.getToken()
        };
    },
    option:function(method,params,header){
        return {
            method:method,
            headers:(!header)?this.header():header,
            body:params
        }
    },
    get:function(url, params,header){
        return fetch(config.apiUrl+url,this.option("GET",params,header))
            .then(respone=>respone.json());
    },
    put:function (url,params,header) {
        return fetch(config.apiUrl+url,this.option("PUT",params,header))
            .then(respone=>respone.json());
    },
    post:function (url,params,header) {
        return fetch(config.apiUrl+url,this.option("POST",params,header))
            .then(respone=>respone.json());
    },
    delete:function (url,params='',header='') {
        return fetch(config.apiUrl+url,this.option("DELETE",params,header))
            .then(respone=>respone.json());
    }
}
