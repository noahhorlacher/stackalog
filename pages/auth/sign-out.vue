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
    <img class="w-16 hidden dark:block mx-auto" src="/icon-white.svg" />
            <img class="w-16 block dark:hidden mx-auto" src="/icon-black.svg" />
    <h1 class="text-4xl font-extrabold">Abmelden...</h1>
</template>