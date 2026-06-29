<template>
  <div id="app">
    <header style="padding: 16px; border-bottom: 1px solid #eee">
      <h2>Vue 3 + VueUse 示例</h2>
    </header>
    <main style="padding: 16px">
      <Home v-model:name="userName"/>
    </main>
  </div>
</template>

<script setup lang="ts">
import Home from "./views/Home.vue";
provideLocal("MyInjectionKey", 1);
const state1 = useLocalStorage('my-store', { hello: 'hi1', greeting: 'Hello1' })
const state2 = useSessionStorage('my-store', { hello: 'hi2', greeting: 'Hello2' })
// 可以编辑 localStorage 和 sessionStorage 默认localStorage
const state3 = useStorage('my-store', { hello: 'hi3', greeting: 'Hello3' })
const state4 = useStorage('my-store', { hello: 'hi4', greeting: 'Hello4' }, window.sessionStorage)

const userName = ref('Alice')
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}
</style>
