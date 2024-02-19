<template>
  <!-- 按钮组件示例 -->
      <div class="test-comp-model">
        <el-button 
      v-copy="12123123123" 
      v-debounce="handletest"
      >点击复制</el-button>
      <el-button v-throttle:1000="handletest">点击测试节流</el-button>
      </div>
    <!-- 弹窗示例 -->
  <div class="test-comp-model">
  <v-button type="primary" @click="open">打开弹窗</v-button>

    <v-dialog 
        title="标题"
        test="123123"
        ref="dialogRef"
        v-model="dialogVisible"
        :dialogType="'readonlyDialog'"
        @saveSubmit="saveSubmit"
  >
  <template #body>
    <div>
      弹窗内容
    </div>
  </template>
  <template #footer>
    <div>
      弹窗自定义底部
    </div>
  </template>
  </v-dialog>
  </div>
  <!-- 表单示例 -->
 <div class="test-comp-model">
  <v-form 
  :formOptions="formOptions"
  :rules="rules"
  :ruleForm="ruleForm"
  @setRef="setFormRef"  labelWidth="120px">
    <template #footer="{ model }">
      <el-button type="primary" @click="submit(model)">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </template>

    <template #childSlot="{ label }">
      {{ label }}
    </template>
  </v-form>
 </div>
  <div style="width: 800px;" class="test-comp-model">
    <!-- 表格示例 -->
    <v-table 
    :columns="columns" 
    border 
    stripe 
    :default-sort="{ prop: 'date', order: 'descending' }"
    :pagination="pagination"
    :request-api="getDataApi"
    :formOptions="tableOptions"
    :ruleForm="tableForm"
    :filAttr="{
      labelWidth: '80px'
    }"
    >
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small"
          >Detail</el-button
        >
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </v-table>
  </div>
</template>


<script setup lang="ts">

import { ref, reactive, onMounted } from 'vue'
// ESM方式引入
import { vButton, vTable, vForm, vDialog } from '../../dist/vue3-library.es.js'
import '../../dist/style.css'

import type { FormInstance, FormItemRule } from 'element-plus'
import { Arrayable, FormOptionType } from '../../packages/v-form/src/type'

defineProps<{ msg: string, }>()

// 弹窗逻辑示例
const dialogRef = ref()
const dialogVisible = ref(false)
const saveSubmit = () => {
  console.log('确定');
}

const open = () => {
  console.log(dialogRef, 'dialogRef');
  dialogRef.value.dialogVisible = true
}

// 表单封装示例
let ruleFormRef = ref<FormInstance>()

const ruleForm = reactive(
  {
    name: '',
    select: '',
    checkBox: [],
  }
);
const rules: Partial<Record<string, Arrayable<FormItemRule>>> = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  select: [
    { required: true, message: '请选择活动区域', trigger: 'change' },
  ],
  checkBox: [
    { type: 'array', required: true, message: '请至少选择一个城市', trigger: 'change' },
  ]
};
const formOptions: FormOptionType[] = reactive([
  {
    label: '输入框',
    prop: 'name',
    componentName: 'el-input',
  },
  {
    label: '下拉框',
    prop: 'select',
    componentName: 'el-select',
    childName: 'el-option',
    attrs: {
      clearable: true,
      placeholder: '请选择'
    },
    children: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ]
  },
  {
    label: '多选框',
    prop: 'checkBox',
    componentName: 'el-checkbox-group',
    childName: 'el-checkbox',
    children: [
      {
        label: '选项1',
      },
      {
        label: '选项2',
      },
      {
        label: '选项3',
      }
    ]
  }
])


const submit = async (model) => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      console.log(model);
    }
  })
}

const reset = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}

// 由于子组件的ref无法在父组件中获取,所以需要在父组件中通过setRef方法传入
const setFormRef = (el) => {
  console.log(el, 'el');
  ruleFormRef = el
}

onMounted(() => {
  console.log(ruleFormRef, 'ruleFormRef');
})

// 表格封装示例
const tData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const columns = [
  {
    label: '日期',
    prop: 'date',
    width: '200px',
    sortable: true
  },
  {
    label: '姓名',
    prop: 'name',
    width: '120px'
  },
  {
    label: '地址',
    prop: 'address',
    width: '500px'
  },
]

const pagination = reactive({
  layout: 'sizes, prev, pager, next',
  currentPage: 1,
  pageSize: 100,
  total: 10000,
  pageSizes: [100, 200, 500],
})

const getDataApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tData)
    }, 1000)
  })
}

const tableOptions = reactive(
  [
    {
      label: '输入框',
      prop: 'name',
      componentName: 'el-input',
    },
    {
      label: '输入框',
      prop: 'name1',
      componentName: 'el-input',
    },
    {
      label: '输入框',
      prop: 'name2',
      componentName: 'el-input',
    },
    {
      label: '输入框',
      prop: 'name3',
      componentName: 'el-input',
    },
    {
      label: '下拉框',
      prop: 'select',
      componentName: 'el-select',
      childName: 'el-option',
      attrs: {
        clearable: true,
        placeholder: '请选择'
      },
      children: [
        {
          label: '选项1',
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        }
      ]
    },
  ]
)
const tableForm = reactive({
  name: '',
  name1: '',
  name2: '',
  name3: '',
  select: '',
})

const handletest = () => {
  console.log('防抖/节流');
}


</script>


<style scoped>
.read-the-docs {
  color: #888;
}

.left-auto {
  margin-left: auto;
}

.test-comp-model {
  padding: 30px 0;
}
</style>
