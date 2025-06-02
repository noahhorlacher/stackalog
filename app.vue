<script setup>
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
  </div>
</template>

<style>
* {
  font-family: 'Poppins', sans-serif;
}
</style>