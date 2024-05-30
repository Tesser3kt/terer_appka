import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
  if (to.name !== 'login' && !usersStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
