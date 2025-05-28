<script setup>
const props = defineProps({
    stack: {
        type: Object,
        default: {
            title: '',
            logs: [],
            id: null
        }
    }
})
</script>

<template>
    <NuxtLink :to="`/stacks/${stack.id}`">
        <Card class="w-48 hover:bg-muted">
            <div v-if="stack.id !== undefined && stack.id !== null">
                <CardHeader>
                    <CardTitle>{{ stack.title }}</CardTitle>
                    <CardDescription>{{ stack.logs.length }} Logs</CardDescription>
                </CardHeader>
            </div>
            <div v-else>
                <CardHeader>
                    <CardTitle>
                        <Skeleton class="h-4 w-full"></Skeleton>
                    </CardTitle>
                    <CardDescription>
                        <Skeleton class="h-4 w-[50%]"></Skeleton>
                    </CardDescription>
                </CardHeader>
            </div>
        </Card>
    </NuxtLink>
</template>