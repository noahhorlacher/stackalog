<script setup>
definePageMeta({
    layout: 'fullwidth'
})

const router = useRouter()

onMounted(() => {
    router.push('/auth/sign-in')
})
</script>

<template>
    <h1 class="text-4xl font-extrabold">Signing out...</h1>
</template>