import service from "@/utils/request";
/** 信息列表 */
//查询
export function GetNewsList(data){
    return service.request({
        method:"post",
        url:"/news/getList/",
        data:data
    })
}
//新增
export function AddNews(data){
    return service.request({
        method:"post",
        url:"/news/add/",
        data:data
    })
}
//修改
export function EditNewsInfo(){
    return service.request({
        method:"post",
        url:"/news/editInfo",
        data:data
    })
}
//删除
export function DeleteInfo(data){
    return service.request({
        method:"post",
        url:"/news/deleteInfo/",
        data:data
    })
}

/** 信息分类 */
 //添加一级分类
export function AddFistCategory(data){
    return service.request({
        method:"post",
        url:"/news/addFirstCategory/",
        data:data
    })
}   
//获取信息分类
export function GetCategory(data){
    return service.request({
        method:"post",
        url:"/news/getCategory/",
        data
    })
}
//删除信息分类
export function DeleteCategory(data){
    return service.request({
        method:"post",
        url:"/news/deleteCategory/",
        data
    })
}
//修改信息分类
export function EditCategory(data){
    return service.request({
        method:"post",
        url:"/news/editCategory/",
        data
    })
}
//添加子集分类
export function AddChildrenCategory(){
    return service.request({
        method:"post",
        url:"/news/addChildrenCategory/",
        data:data
    })
}