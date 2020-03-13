import { reactive } from "@vue/composition-api";
export function Pageination () {
  const pageData = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    pageSizes: [10, 20, 50, 100]
  });
  const pageTotalCount = (val) => pageData.total = val;
  const handleSizeChange = (val) => pageData.pageSize = val;
  const handleCurrentChange = (val) => pageData.currentPage = val;
  return {
    pageData,
    pageTotalCount,
    handleSizeChange,
    handleCurrentChange
  }
}
