<template>
  <div class="v-dialog">
    <el-dialog
        v-bind="$attrs"
        v-model="visible"
        :append-to-body="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :draggable="isDraggable"
        >
      <slot name="body"></slot>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button  v-if="dialogType != 'readonlyDialog'" type="primary" @click="saveSubmit">
          确 定
        </el-button>
      </span>
      </template>
      <slot name="footer"></slot>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
const dialogVisible = ref(false)

// 可以直接使用
defineProps({
  dialogType: { type: String, default: "" },
  isDraggable: { type: Boolean, default: false }
})

// 单向传递数据流
const visible = computed({
  get() {
    return dialogVisible.value
  },
  set(val:boolean) {
    return  dialogVisible.value = val
  }
})

defineExpose({
  dialogVisible
})

const emit = defineEmits(['saveSubmit'])
const saveSubmit = () => {
  emit('saveSubmit');
}
</script>
