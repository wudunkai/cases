<template>
  <div id="app">
    <header style="padding:16px;border-bottom:1px solid #eee">
      <h2>Vue 3 + VueUse 示例</h2>
    </header>
    <main style="padding:16px">
      <Home />
    </main>
  </div>
</template>

<script setup lang="ts">
import Home from "./views/Home.vue";
</script>

<style>
body { font-family: Arial, Helvetica, sans-serif; margin:0; }
</style>
