<script setup>
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css' // vue-sonner v2 requires this import

import { useFavicon } from '@vueuse/core';
const colorMode = useColorMode()
const favicon = useFavicon()

favicon.value = colorMode.value === 'dark' ? '/favicon-dark.svg' : '/favicon.svg'

watch(colorMode, () => {
  favicon.value = colorMode.value === 'dark' ? '/favicon-dark.svg' : '/favicon.svg'
})
</script>

<template>
  <div vaul-drawer-wrapper class="bg-background">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
  </div>
</template>

<style>
</style>