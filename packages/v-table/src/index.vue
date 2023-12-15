<template>
  <div class="filter-block">
    <VForm 
  :formOptions="formOptions"
  :ruleForm="ruleForm"
  @setRef="setFormRef"
  v-bind="filAttr"
  >
    <template #footer="{ model }">
      <div style="padding-left: 20px;">
        <el-button type="primary" @click="search(model)">搜索</el-button>
      <el-button @click="reset">重置</el-button>
      </div>
    </template>

    <template #childSlot="{ label }">
      {{ label }}
    </template>
  </VForm>
  </div>
   <el-table :data="data" style="width: 100%" v-bind="$attrs">
    <!-- 多选框使用 -->
    <slot name="selection"></slot>
    <el-table-column  
    v-for="item in columns" :key="item.label"
    :prop="item.prop" 
    :label="item.label" 
    :width="item.width" 
    :sortable="item.sortable"
    :formatter="item.formatter ? item.formatter : filterCellVal"  />
    <!-- 操作模块 -->
    <slot></slot>
  </el-table>
  <el-pagination
  class="mt-20"
  background 
  small
  :layout="pagination.layout" 
  :total="pagination.total"
  :current-page="pagination.currentPage"
  :page-size="pagination.pageSize"
  :page-sizes="pagination.pageSizes"
  @current-change="handleCurrentChange"
  @size-change="handleSizeChange"
   />
</template>
<script setup lang='ts'>
import { ref, Ref } from 'vue'
import { TableItemType, ColumnsType, PaginationType } from './type';
import VForm from '../../v-form/src/index.vue'
import { RuleForm, FormOptionType } from '../../v-form/src/type'
import type {FormInstance} from 'element-plus'

const props = defineProps<{
  columns: ColumnsType[],
  pagination: PaginationType,
  requestApi: Function,
  formOptions: FormOptionType[],
  ruleForm: RuleForm,
  filAttr?: any
}>()

const data = ref<TableItemType[]>()

const filterCellVal = (_row: any, _column: any, cellValue: any) => {
  return cellValue
}

const emit = defineEmits(['handleCurrentChange', 'handleSizeChange'])
const handleCurrentChange = (val: number) => {
  emit('handleCurrentChange', val)
  getTableData()
}

const handleSizeChange = (val: number) => {
  emit('handleSizeChange', val)
  getTableData()
}

const getTableData = (model = props.ruleForm) => {
  props.requestApi(model).then((res: TableItemType[]) => {
    data.value = res
  })
    .catch((err: Error) => {
      console.log('Error: ', err);
    })
}

// 初始化渲染
getTableData()

let ruleFormRef = ref<FormInstance>()
const setFormRef = (el:Ref<FormInstance>) => {
  ruleFormRef = el
}


const search = async (model:RuleForm) => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      console.log(model, '搜索的数据请求接口');
      getTableData(model)
    }
  })
}

const reset = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}

</script>
<style lang='scss' scoped>
.mt-20 {
  margin-top: 20px;
  justify-content: center;
}
.filter-block .el-form{
  display: flex;
  flex-wrap: wrap;
}
</style>