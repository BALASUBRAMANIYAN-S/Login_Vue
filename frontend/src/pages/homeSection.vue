<script setup>
import { ref } from 'vue'

const col = ref(true)

const Col = () => {
  col.value = !col.value
}
</script>

<template>
  <h1 @click="Col" class="cursor-pointer" :class="col ? 'text-blue' : 'text-red'">{{col?'Click Me':'Get a $Money📌'}}</h1>
</template>
