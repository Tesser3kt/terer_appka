import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from '@/stores/users'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const usersStore = useUsersStore()
  if (to.name !== 'login' && !usersStore.isLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
