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
    },
    variant:function(){
        return ApiService.get('/variant/option');
    },
    variantValue:function(variantId){
        return ApiService.get('/variant/'+variantId+"/value");
    },
    category:function(){
        return ApiService.get('/category/option');
    }
}