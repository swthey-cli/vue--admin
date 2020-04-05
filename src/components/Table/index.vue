<template>
  <div>
    <el-table
      :data="data.tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" v-if="data.tableConfig.selection"></el-table-column>
      <template v-for="item in data.tableConfig.tHead">
        <el-table-column
          :prop="item.field"
          :label="item.label"
          :key="item.field"
          v-if="item.columnType ==='slot'"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          :key="item.field" 
          :prop="item.field"
          :formatter="item.formatter"
          :label="item.label"
          v-else
        ></el-table-column>
      </template>
    </el-table>
    <div>
      <el-row>
        <el-col :span="4">
          <template>
            <slot name="deleteAll"></slot>
          </template>
        </el-col>
        <el-col :span="20">
          <el-pagination
            class="pull-right"
            v-if="data.tableConfig.pageination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageData.currentPage"
            :page-sizes="pageData.pageSizes"
            :page-size="pageData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.total"
            background
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive, onBeforeMount, watch } from '@vue/composition-api';
import { LodaData } from './tableLoadData';
import { Pageination } from './pageiantionHook';
Pageination
export default {
  name: "tableVue",
  props: {
    config: {
      type: Object,
      default: () => { }
    },
    tableRow: {
      type: Object,
      default: () => { }
    }
  },
  setup (props, { root, emit }) {
    const { loadData, tableLoad } = LodaData();
    const { pageData, handleSizeChange, handleCurrentChange, pageTotalCount } = Pageination();
    const data = reactive({
      tableConfig: {
        selection: true,
        requestData: {},
        tHead: [],
        pageination: true,
      },
      tableData: [],
      total: 0
    });
    //数据加载监听
    watch([() => loadData.item, () => loadData.total], ([item, total]) => {
      data.tableData = item;
      pageTotalCount(total);
    });
    //页码页脚监听
    watch([() => pageData.pageSize, () => pageData.currentPage], ([pageSize, currentPage]) => {
      let page = data.tableConfig.requestData.data;
      if (page) {
        page.pageSize = pageSize;
        page.pageNumber = currentPage;
        tableLoad(data.tableConfig.requestData);
      }
    })
    const handleSelectionChange = (val) => {
      let rowData = {
        idItem: val.map(item => item.id)
      }
      emit("update:tableRow", rowData);
    }
    const refresData = () => {
      tableLoad(data.tableConfig.requestData);
    }
    const paramsLoadData = (params) => {
      let paramsData = Object.assign({}, params, {
        pageNumber: 1,
        pageSize: 10
      });
      data.tableConfig.requestData.data = paramsData;
      console.log(data.tableConfig.requestData);
      tableLoad(data.tableConfig.requestData);
    }

    //表格列动态加载
    const initTableConfig = () => {
      let configData = props.config;
      let keys = Object.keys(data.tableConfig);
      for (let key in configData) {
        if (keys.includes(key)) {
          data.tableConfig[key] = configData[key];
        }
      }
    }
    onBeforeMount(() => {
      initTableConfig();
      tableLoad(data.tableConfig.requestData);
    })
    return {
      data,
      pageData, handleSizeChange, handleCurrentChange,
      handleSelectionChange, refresData, paramsLoadData
    }
  }
}
</script>
<style lang="scss" scoped>
</style>