<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/PinIa'
const user = useUserStore()
user.login('321321')
</script>
<template>
  qqq
  <slot name="user"></slot>
  <slot name="login"></slot>
</template>