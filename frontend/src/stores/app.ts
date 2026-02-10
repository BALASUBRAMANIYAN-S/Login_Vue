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
      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // 1. Parse the JSON once and store it in a variable
      const data = await response.json();

      if (!response.ok) {
        // Most backends send errors in a 'message' or 'detail' field
        this.error = data.message || data.detail || "An error occurred";
        return; 
      }

      // 2. Assign data to your state
      this.user = data; 
      this.message = "Login Successful!"; // Or data.message if your backend sends one

      return data; // Return happens LAST

    } catch (error: any) {
      this.error = error.message || "Network Error";
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
},
})
