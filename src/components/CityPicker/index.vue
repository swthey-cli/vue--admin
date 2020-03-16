<template>
  <div class="overflow-h">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-select v-model="data.provinceValue" @change="handlerProvince" v-if="init.province">
          <el-option
            v-for="province in data.provinceData"
            :key="province.PROVINCE_CODE"
            :label="province.PROVINCE_NAME"
            :value="province.PROVINCE_CODE"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="data.cityValue" @change="handlerCity" v-if="init.city">
          <el-option
            v-for="city in data.cityData"
            :key="city.CITY_CODE"
            :label="city.CITY_NAME"
            :value="city.CITY_CODE"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="data.areaValue" @change="handlerArea" v-if="init.area">
          <el-option
            v-for="area in data.areaData"
            :key="area.AREA_CODE"
            :label="area.AREA_NAME"
            :value="area.AREA_CODE"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="data.streetValue" @change="handlerStreet" v-if="init.street">
          <el-option
            v-for="street in data.streetData"
            :key="street.STREET_CODE"
            :label="street.STREET_NAME"
            :value="street.STREET_CODE"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { GetPicker } from "@/api/common";
import { onMounted, reactive, onBeforeMount, watch } from '@vue/composition-api';
import { cityPicker } from "./cityPicker";
export default {
  name: "cityIndex",
  props: {
    cityPickerLevel:
    {
      type: Array,
      default: () => []
    },
    cityPickerData: {
      type: Object,
      default: () => {
      }
    }
  },
  setup (props, { root, emit }) {
    const init = reactive({
      province: false,
      city: false,
      area: false,
      street: false
    });
    const {
      handlerProvince,
      handlerCity,
      handlerArea,
      handlerStreet,
      getGrovince,
      data,
      resultData
    } = cityPicker();

    watch(([() => resultData.provinceValue,
    () => resultData.cityValue,
    () => resultData.areaValue,
    () => resultData.streetValue]), ([provinceValue, cityValue, areaValue, streetValue]) => {
      emit("update:cityPickerData", resultData);
    })

    const initData = () => {
      if (props.cityPickerLevel.length == 0) {
        for (let key in init) {
          init[key] = true;
        }
      } else {
        props.cityPickerLevel.forEach(item => {
          init[item] = true;
        })
      }
    }

    onBeforeMount(() => {
      initData();
      getGrovince();
    })
    return {
      handlerProvince,
      handlerArea,
      handlerCity,
      handlerStreet,
      initData,
      getGrovince,
      data,
      init
    }
  }
}
</script>
<style lang="scss" scoped>
</style>