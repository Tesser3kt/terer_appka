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
    },
    {
      path: '/qr/show/:number',
      name: 'qr-show',
      component: () => import('../views/QrShowView.vue')
    },
    {
      path: '/qr/:number',
      name: 'qr',
      component: () => import('../views/QrView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const usersStore = useUsersStore()
  if (to.name !== 'login' && !usersStore.isLoggedIn) {
    await usersStore.getUserFromCookie()
    if (!usersStore.isLoggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
