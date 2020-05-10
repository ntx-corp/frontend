import {ApiService} from "../../../services/ApiService";

export const ItemService = {
    getList:function (params) {
        return ApiService.get('/item',params);
    },
    create:function(params){
        return ApiService.postForm('/item',params);
    },
    update:function(id,params){
        return ApiService.postForm('/item/'+id,params);
    },
    detail:function(id){
        return ApiService.get('/item/'+id);
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