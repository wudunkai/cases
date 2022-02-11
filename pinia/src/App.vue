<script setup lang="ts">
import PinIa from './components/PinIa.vue'
import handleUpload from './components/handleUpload.vue'

</script>

<template>
  <PinIa>
    <template #user>user</template>
    <template #login>login</template>
  </PinIa>
  <handleUpload />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
