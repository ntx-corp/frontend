import {ApiService} from "../../../services/ApiService";

export const ItemService = {
    getList:function (params) {
        return ApiService.get('/item',params);
    },
    create:function(params){
        return ApiService.post('/item',params);
    },
    detail:function(id){
        return ApiService.get('/item/'+id);
    },
    update:function(id,params){
        return ApiService.put('/item/'+id,params);
    }
}