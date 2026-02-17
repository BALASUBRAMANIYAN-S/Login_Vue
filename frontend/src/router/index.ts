
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/auth'

// Define public routes that don't require authentication
const publicRoutes = ['/login']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Global route guard for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isPublicRoute = publicRoutes.includes(to.path)
  const isAuthenticated = authStore.isAuthenticated

  // If route requires authentication and user is not authenticated
  if (!isPublicRoute && !isAuthenticated) {
    // Redirect to login
    next('/login')
  }
  // If user is authenticated and tries to access login, redirect to home
  else if (isPublicRoute && isAuthenticated && to.path === '/login') {
    next('/')
  }
  // Allow navigation
  else {
    next()
  }
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
