import { defineStore } from 'pinia'

const API = 'http://127.0.0.1:8000/api/users'
const TOKEN_KEY = 'auth_token'
const USER_KEY = 'user_data'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    error: null as string | null,
    token: localStorage.getItem(TOKEN_KEY) || null,
    user: JSON.parse(localStorage.getItem(USER_KEY) || 'null'),
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.token
    },
    getToken(): string | null {
      return this.token
    },
    getUser(): any {
      return this.user
    },
  },

  actions: {
    async register(payload: any) {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(`${API}/register/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error('Registration failed')
        }

        const data = await response.json()
        return data

      } catch (err: any) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async login(payload: any) {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(`${API}/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        const data = await response.json()

        if (response.ok && data.Success) {
          // Store JWT token
          const token = data.token || data.access_token
          if (token) {
            this.token = token
            localStorage.setItem(TOKEN_KEY, token)
            
            // Store user data if available
            if (data.user) {
              this.user = data.user
              localStorage.setItem(USER_KEY, JSON.stringify(data.user))
            }
          }
          return true
        } else {
          this.error = data.message || 'Login failed'
          return false
        }

      } catch (err: any) {
        this.error = err.message
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    },

    // Check if token exists on app load
    initializeAuth() {
      const token = localStorage.getItem(TOKEN_KEY)
      const user = localStorage.getItem(USER_KEY)
      
      if (token) {
        this.token = token
      }
      if (user) {
        this.user = JSON.parse(user)
      }
    },
  },
})
