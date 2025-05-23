<script setup>
const colorMode = useColorMode()
colorMode.preference = 'dark'
</script>

<template>
  <div>
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger class="p-5 fixed cursor-pointer ml-4 mt-4" variant="ghost" />
        
        <div class="py-12 px-24">
          <nuxt-page />
        </div>

      </main>
    </SidebarProvider>
  </div>
</template>

<style>
* {
  font-family: 'Poppins', sans-serif;
}
</style>