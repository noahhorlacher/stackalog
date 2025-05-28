<script setup>
const props = defineProps({
    log: {
        type: Object,
        default: {
            title: '',
            id: null
        }
    }
})
</script>

<template>
    <NuxtLink :to="`/logs/${log.id}`">
        <Card class="w-48 cursor-pointer hover:bg-muted">
            <div v-if="log.id !== undefined && log.id !== null">
                <CardHeader>
                    <!-- image -->
                    <Skeleton class="h-32 w-full mb-4"></Skeleton>
                    <CardTitle>{{ log.title }}</CardTitle>
                </CardHeader>
            </div>
            <div v-else>
                <CardHeader>
                    <CardTitle>
                        <Skeleton class="h-32 w-full mb-4"></Skeleton>
                        <Skeleton class="h-4 w-full"></Skeleton>
                    </CardTitle>
                </CardHeader>
            </div>
        </Card>
    </NuxtLink>
</template>