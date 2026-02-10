<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router'

const store = useAppStore()
const router = useRouter()

const firstName = ref('')
const lastName = ref('')

const submit = async () => {
  console.log('Submit clicked')
  const result = await store.userDetails({
    username: firstName.value,
    password: lastName.value,
  })

  if (result && !store.error) {
    firstName.value = ''
    lastName.value = ''
    try {
      await router.push('/homeSection')
    } catch (err) {
      console.error('Navigation error:', err)
    }
  }
}

</script>
<template>
  <v-container>
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="submit">
        <v-text-field v-model="firstName" label="First name"></v-text-field>

        <v-text-field v-model="lastName" label="Last name"></v-text-field>
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>
