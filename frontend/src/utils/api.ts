import { useAuthStore } from '@/stores/auth'

const TOKEN_KEY = 'auth_token'

/**
 * Fetch wrapper that automatically includes JWT token in headers
 * @param url - API endpoint URL
 * @param options - Fetch options
 * @returns Promise with response
 */
export async function fetchWithToken(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem(TOKEN_KEY)
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return fetch(url, {
    ...options,
    headers,
  })
}

/**
 * Get the current authentication token
 */
export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const authStore = useAuthStore()
  return authStore.isAuthenticated
}

/**
 * Clear auth token (logout)
 */
export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Get Authorization header
 */
export function getAuthHeader(): { Authorization: string } | {} {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
