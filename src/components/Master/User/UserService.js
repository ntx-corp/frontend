import {ApiService} from "../../../services/ApiService";
// import React from "react";

export const UserService = {
    getList:function (params) {
        return ApiService.get('/user',params);
    },
    create:function(params){
        return ApiService.post('/user',params);
    },
    detail:function(id){
        return ApiService.get('/user/'+id);
    },
    update:function(id,params){
        return ApiService.put('/user/'+id,params);
    }
}