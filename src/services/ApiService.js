import config from '../utils/config';
import {AuthService as auth} from "./AuthService";
import {handleResponse} from "../helpers";
import axios from 'axios';

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
        let hdr = (!header)?this.header():header;
        hdr = {
            ...hdr,
            'Authorization': 'Bearer ' + auth.getToken()
        }
        return {
            method:method,
            headers:hdr,
            body:JSON.stringify(params)
        }
    },
    get:function(url, params,header){
        const queryString = this.objToQueryString(params);
        return fetch(config.apiUrl+url+"?"+queryString,this.option("GET",header))
            .then(handleResponse);
    },
    put:function (url,params,header) {
        return fetch(config.apiUrl+url,this.option("PUT",params,header))
            .then(respone=>respone.json());
    },
    post:function (url,params,header) {
        return fetch(config.apiUrl+url,this.option("POST",params,header))
            .then(respone=>respone.json());
    },
    postForm:function(url,params,header){
        const data = new FormData();
        for(const name in params){
            if(name != "file"){
                var value = params[name];
                if(Array.isArray(params[name])){
                    value = JSON.stringify(params[name]);
                }else if(value===null){
                    value = "";
                }
                data.append(name,value)
            }
            else{
                data.append(name,params[name])
            }
        }
        // const formData={
        //     method:"POST",
        //     mode: 'cors',
        //     headers:{
        //         'Content-Type': 'multipart/form-data; charset=utf-8;',
        //         'Authorization': 'Bearer ' + auth.getToken()
        //     },
        //     body:data
        // }
        // return fetch(config.apiUrl+url,formData)
        //     .then(respone=>respone.json());

        const option = {
            method: 'POST',
            url: url,
            baseURL:config.apiUrl,
            headers: {
                'Content-Type': 'multipart/form-data; charset=utf-8;',
                'Authorization': 'Bearer ' + auth.getToken()
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json;charset=UTF-8'
            },
            data: data
        }
        let response = axios(option);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        if (responseOK) {
            let data = response.data;
            return data;
            // do something with data
        }
        return null;
    },
    delete:function (url,params='',header='') {
        return fetch(config.apiUrl+url,this.option("DELETE",params,header))
            .then(respone=>respone.json());
    },
    objToQueryString:function(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }
}
