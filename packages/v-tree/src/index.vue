<template>
   <el-tree
    ref="treeRef"
    v-bind="$attrs"
    :data="treeData"
    :show-checkbox="showCheckBox"
    node-key="id"
    :default-checked-keys="defaultKeys"
    :props="defaultProps"
  />
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import {TreeDataType} from './type';
const defaultProps = {
  children: 'children',
  label: 'label',
}

withDefaults(defineProps<{
  showCheckBox: boolean,
  treeData: TreeDataType[],
  defaultKeys: number[],
}>(), {
  treeData: () => [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 4,
          label: '二级 1-1',
        }
      ]
    }
  ],
  defaultKeys: () => [],
  showCheckBox: false
})

// 接收子组件的ref
const treeRef = ref()
const emit = defineEmits(['setTreeRef'])
onMounted(() => {
  emit('setTreeRef', treeRef)
})
</script>
<style lang='scss' scoped>
</style>\