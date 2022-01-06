<script setup lang="ts">
import { useUserStore } from '../stores/PinIa.ts'
const user = useUserStore()
user.login('321321')
</script>

<template></template>

<style>
</style>