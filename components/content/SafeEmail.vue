<template>
  <a href="#" @click.prevent="handleClick" v-html="displayText || obfuscatedEmail"></a>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  displayText: {
    type: String,
    default: ''
  }
})

const obfuscatedEmail = computed(() => {
  return props.username + '&#64;' + props.domain
})

function handleClick() {
  const email = props.username + '@' + props.domain
  window.location.href = 'mailto:' + email
}
</script>
