import config from '../utils/config';
import {AuthService as auth} from "./AuthService";
import {handleResponse} from "../helpers";

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
    /*get2:function(url, params,header){
        return new Promise((resolve, reject) => {
            //get token from local storage if there is one
            const jwttoken = localStorage.getItem('jwttoken');
            const bearer = 'Bearer ' + jwttoken;
            const data = new FormData();
            // get the website backend main url from .env
            const REACT_APP_URL = process.env.REACT_APP_URL
            fetch(config.apiUrl+url, this.option("GET",params,header)).then(
                (response) => {
                    response.json()
                        .then((res) => {
                            if (response.status === 200) {
                                resolve(true);
                                return res;
                            }
                            if (response.status === 401) {
                                localStorage.removeItem('jwttoken');
                                resolve(false)
                            }
                        })
                }
            ).catch((err) => {
                // reject(err)
            });
        })
    },
    get3:function(url, params,header){
        return new Promise((resolve, reject) => {
            fetch(config.apiUrl+url, this.option("GET",params,header)).then(
                (response) => {
                    if (response.ok) {
                        const contentType = response.headers.get('Content-Type') || '';

                        if (contentType.includes('application/json')) {
                            return response.json().catch(error => {
                                return Promise.reject(error.message);
                            });
                        }

                        if (contentType.includes('text/html')) {
                            return response.text().then(html => {
                                return {
                                    page_type: 'generic',
                                    html: html
                                };
                            }).catch(error => {
                                return Promise.reject(error.message);
                            })
                        }

                        return Promise.reject('Invalid content type: ' + contentType);
                    }

                    if (response.status == 404) {
                        return Promise.reject('Page not found: ' + url);
                    }

                    return Promise.reject('HTTP error: ' + response.status);
                }
            ).catch((err) => {
                return Promise.reject(err.message);
            });
        })
    },
    get4:function(url, params,header){
        return fetch(config.apiUrl+url,this.option("GET",params,header))
            .then(respone=>respone.json())
            .then(res => {
                return JSON.stringify(res);
            });
        // console.log(jsonData)
    },*/
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
