import { defineStore } from 'pinia'

const API = 'http://127.0.0.1:8000/api/users'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    error: null as string | null,
  }),

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
  },
})
