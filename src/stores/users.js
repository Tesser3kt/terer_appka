import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useUsersStore = defineStore('users', () => {
  const users = ref([{ id: 1, username: 'admin', password: 'admin' }])
  const isAuthenticated = computed(() => {
    user_id = $cookies.get('user_id')
    return user_id !== undefined
  })
  async function fetchUsers() {}
  function loginUser(username, password) {
    const user = users.value.find((user) => user.username === username)
    if (user && user.password === password) {
      $cookies.set('user_id', user.id)
      router.push({ name: 'home' })
    }
  }
})
