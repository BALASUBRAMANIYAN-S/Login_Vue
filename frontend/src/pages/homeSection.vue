<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const col = ref(true)

const Col = () => {
  col.value = !col.value
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div>
    <v-btn color="error" size="small" @click="logout" class="mb-4">Logout</v-btn>
    <h1 @click="Col" class="cursor-pointer" :class="col ? 'text-blue' : 'text-red'">{{col?'Click Me':'Get a $Money📌'}}</h1>
  </div>
</template>
