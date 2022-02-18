<script setup lang="ts">
import PinIa from './components/PinIa.vue'
import handleUpload from './components/handleUpload.vue'
import { reactive, ref, toRefs } from 'vue';
const form: any = {
  error: ref<string>("aaa"),
  errors: reactive({
    name: '1',
    password: '2'
  })
}
const { error, errors } = form
const { name } = toRefs(form.errors)
console.log(name, form.errors);

</script>

<template>
  {{ error }}
  <input v-model="error" />
  {{ name }}
  <div v-for="(item, index) in errors" :key="index">
    {{ item }}
    <input v-model="errors[index]" />
  </div>
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
