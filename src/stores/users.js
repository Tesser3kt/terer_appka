import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [{ id: 1, username: 'admin', password: 'admin' }],
    currentUser: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser
  },
  actions: {
    getUserFromCookie() {
      const user_id = parseInt($cookies.get('user_id'))
      this.currentUser = this.users.find((user) => user.id === user_id)
    },
    login(username, password) {
      const user = this.users.find((user) => user.username === username)
      if (user && user.password === password) {
        this.currentUser = user
        $cookies.set('user_id', user.id)
      } else {
        this.currentUser = null
        $cookies.remove('user_id')
      }
    }
  }
})
