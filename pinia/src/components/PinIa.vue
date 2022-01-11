<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/PinIa'
const user = useUserStore()
const img = ref()
const login = import('../assets/logo.png')
console.log(login.then(res => img.value = 'image:/' + res.default))
user.login('321321')
</script>

<template>
  <img :src="img" />
</template>

<style>
</style>