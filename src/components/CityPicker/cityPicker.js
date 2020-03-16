import { GetPicker } from "@/api/common";
import { reactive, toRefs } from '@vue/composition-api';
export function cityPicker () {
  const data = reactive({
    provinceValue: "",
    cityValue: "",
    areaValue: "",
    streetValue: "",
    provinceData: [],
    cityData: [],
    areaData: [],
    streetData: []
  });
  const resultData = reactive({
    provinceValue: "",
    cityValue: "",
    areaValue: "",
    streetValue: "",
  })
  //获取省份
  const getGrovince = () => {
    getData({
      type: "province"
    });
  }
  //选择省份,获取城市
  const handlerProvince = (val) => {
    resetValue({ type: "city" });
    getData({
      type: "city",
      province_code: val
    });
  }
  //选择城市,获取区县
  const handlerCity = (val) => {
    resetValue({ type: "area" });
    getData({
      type: "area",
      city_code: val
    });
  }
  //获取街道
  const handlerArea = (val) => {
    resetValue({ type: "street" });
    getData({
      type: "street",
      area_code: val
    });
  }

  const handlerStreet = (val) => {
    resetValue({ type: "" });
  }

  const getData = (requestData) => {
    GetPicker(requestData).then(response => {
      data[`${requestData.type}Data`] = response.data.data.data;
    }).catch();
  }


  const resetValue = (params) => {
    const valueJson = {
      city: ['cityValue', 'areaValue', 'streetValue'],
      area: ['areaValue', 'streetValue'],
      street: ['streetValue']
    };
    const arrObj = valueJson[params.type];
    if (arrObj) { arrObj.forEach(item => data[item] = ""); }
    result();
  }

  const result = () => {
    for (var key in resultData) {
      resultData[key] = data[key];
    }
  }


  return {
    //...toRefs(data),
    data,
    resultData,
    handlerProvince,
    handlerCity,
    handlerArea,
    handlerStreet,
    getGrovince,
    resetValue,
    result,
    getData
  }

}