<script setup lang="ts">
import { ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import HelloWorld from './components/HelloWorld.vue'
import type { EpPropMergeType } from 'element-plus/es/utils/vue/props/types'

const zIndex = ref(3000);
const size = 'small' as EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never> | undefined
</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex">
  <HelloWorld msg="Vite + Vue" />
  </el-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
