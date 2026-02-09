/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
export type Rule = (v: string) => true | string
export const RULES: Record<string, Rule[]> = {
  email: [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ],
password:[
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length >= 5) || 'Password must be at least 5 characters',
  (v: string) => /[A-Z]/.test(v) || 'Must include one uppercase letter',
  // (v: string) => /[0-9]/.test(v) || 'Must include one number',
  // (v: string) => /[\W_]/.test(v) || 'Must include one special character (@, #, $, etc.)'
]
}