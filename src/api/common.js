import { GetCategory, GetAllCategory } from "@/api/news";
import service from "@/utils/request";
import { reactive, ref } from "@vue/composition-api";
export function common () {
  const categoryItem = reactive({
    item: []
  });
  //获取所有一级分类
  const getInfoCategory = () => {
    GetCategory({})
      .then(response => {
        categoryItem.item = response.data.data.data;
      })
      .catch();
  };
  //获取全部分类信息
  const getAllCategory = () => {
    GetAllCategory({})
      .then(response => {
        console.log(response);
        categoryItem.item = response.data.data;
      })
      .catch();
  };
  return {
    categoryItem,
    getAllCategory,
    getInfoCategory
  };
}

/**
 * 获取七牛云token
 */
export function QiniuToken (data) {
  return service.request({
    method: "post",
    url: "/uploadImgToken/",
    data: data
  });
}

export function LoadTableData (params) {
  return service.request({
    method: params.method || "post",
    url: params.url,
    data: params.data || {}
  });
}

/**
 * 获取省市区关联
 * 
 * @param {*
 * 
 * 
 * } params 
 */
export function GetPicker (data) {
  return service.request({
    method: "post",
    url: "/cityPicker/",
    data
  });
}