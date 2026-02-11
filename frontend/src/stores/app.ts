// stores/app.js
import { defineStore } from 'pinia'

const api = 'http://127.0.0.1:8000/api/profiles/'

export const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
    error: null,
    user: null,
    message : null,
  }),

// stores/app.js
actions: {
  async userDetails(payload: any) {
    this.loading = true;
    this.error = null;
    this.message = null;

    try {
  const res = await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    this.error = data.message || "Error";
    return;
  }

  this.user = data;
  this.message = "Success";
  return data;

} catch (error: any) {
  this.error = "Network Error";
} finally {
  this.loading = false;
}
  },
},
})
