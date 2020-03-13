/**
 * 表格组件-初次请求加载数据
 * loadData:数据集
 * tableLoad:请求数据方法
 */
import { reactive } from "@vue/composition-api";
import { LoadTableData } from '@/api/common';
import { requestUrl } from '@/api/requestUrl';
export function LodaData () {
  const loadData = reactive({
    item: [],
    total: 0
  });
  const tableLoad = (params) => {
    let requestJson = params;
    let requestData = {
      url: requestUrl[requestJson.url],
      method: requestJson.method,
      data: requestJson.data
    }
    LoadTableData(requestData).then(response => {
      let responseData = response.data.data.data;
      if (responseData && responseData.length > 0) {
        loadData.item = responseData;
        loadData.total = response.data.data.total;
      }


    }).catch();
  };
  return {
    loadData,
    tableLoad,
  }
}