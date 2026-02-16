<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { RULES } from '@/plugins'

const router = useRouter()
const authStore = useAuthStore()

const loginValid = ref(false)
const registerValid = ref(false)
const newLogin = ref(false)
const loading = ref(false)

const form = ref({
  username: '',
  password: ''
})

const registerForm = ref({
  username: '',
  email: '',
  password: ''
})

const SignIn = async () => {
  loading.value = true
  try {
    const success = await authStore.login(form.value)
    if (success) {
      form.value.username = ''
      form.value.password = ''
      router.push('/homeSection')
    }
  } catch (error) {
    console.error('Login failed')
  } finally {
    loading.value = false
  }
}

const SignUp = async () => {
  loading.value = true
  try {
    await authStore.register(registerForm.value)
    registerForm.value.username = ''
    registerForm.value.email = ''
    registerForm.value.password = ''
    newLogin.value = false
  } catch (error) {
    console.error('Signup failed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <h2 class="text-center mb-4">{{ newLogin ? 'Register Page' : 'Login Page' }}</h2>
      <v-form v-if="!newLogin" v-model="loginValid">
        <v-text-field v-model="form.username" label="Username" :rules="RULES.required" clearable />
        <v-text-field v-model="form.password" label="Password" type="password" :rules="RULES.password" clearable/>
        <v-btn color="success" size="large" block :disabled="!loginValid" :loading="loading" @click="SignIn" >Sign In</v-btn>
      </v-form>
      <!-- REGISTER FORM -->
      <v-form v-else v-model="registerValid">
        <v-text-field v-model="registerForm.username" label="Username" :rules="RULES.required" clearable/>
        <v-text-field v-model="registerForm.email" label="Email" :rules="RULES.email" clearable />
        <v-text-field v-model="registerForm.password" label="Password" type="password" :rules="RULES.password" clearable/>
        <v-btn color="success" size="large" block :disabled="!registerValid" :loading="loading" @click="SignUp" >Sign Up</v-btn>
      </v-form>

      <div class="text-center mt-4">
        <span class="text-body-2 text-medium-emphasis">
          {{ newLogin ? 'Already have an account?' : 'New user?' }}
        </span>
        <v-btn variant="text" color="primary"class="text-none pa-0"@click="newLogin = !newLogin">{{ newLogin ? 'Sign In' : 'Create an Account' }}</v-btn>
      </div>

    </v-card>
  </v-sheet>
</template>
