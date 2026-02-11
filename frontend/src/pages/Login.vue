<script setup lang="ts">
import { RULES } from '@/plugins'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const loginValid = ref(false)
const registerValid = ref(false)
const newLogin = ref (false)
const form = ref({
    email: '',
    password: ''
})
const registerForm = ref({
    email: '',
    password: '',
    username: ''
})
const loading = ref(false)

const SignIn=async ()=>{
    console.log(form.value.email)
}
const SignUp = async () => {
  loading.value = true

  try {
    await authStore.register(registerForm.value)

    // clear form only after success
    registerForm.value.email = ''
    registerForm.value.password = ''
    registerForm.value.username = ''
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
            <h2 v-if="!newLogin">Login Page</h2>
            <h2 v-else>Register Page</h2>
            <!-- Login Form -->
            <v-form v-if="!newLogin" v-model="loginValid">
             <v-text-field v-model="form.email" :rules="RULES.email" label="Email" clearable />
             <v-text-field v-model="form.password" :rules="RULES.password" label="Password" type="password" clearable />
            <br />
             <v-btn :disabled="!loginValid" :loading="loading" color="success" size="large" @click="SignIn" variant="elevated" block> Sign In</v-btn>
            </v-form><br>
            <!-- Register Form -->
            <v-form v-if="newLogin" v-model="registerValid">
             <v-text-field v-model="registerForm.username" label="username" type="username" clearable />
             <v-text-field v-model="registerForm.email" :rules="RULES.email" label="Email" clearable />
             <v-text-field v-model="registerForm.password" :rules="RULES.password" label="Password" type="password" clearable />
            <br />
             <v-btn :disabled="!registerValid" :loading="loading" color="success" size="large" @click="SignUp" variant="elevated" block> Sign UP</v-btn>
            </v-form><br>
            <!-- Create Or Sign In Buttons -->
            <div class="text-center">
                <span v-if="!newLogin" class="text-body-2 text-medium-emphasis">New user? </span>
                <span v-if="newLogin" class="text-body-2 text-medium-emphasis">Alredy I Have? </span>
                <v-btn v-if="newLogin" variant="text" color="primary" class="text-none pa-0" @click="newLogin = false">Sign In</v-btn>
                <v-btn v-if="!newLogin" variant="text" color="primary" class="text-none pa-0" @click="newLogin = true">Create an Account</v-btn>
            </div>
        </v-card>
    </v-sheet>
</template>
