<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUsersStore } from './stores/users'

const usersStore = useUsersStore()

onMounted(() => {
  usersStore.getUserFromCookie()
})
</script>

<template>
  <RouterView />
</template>
