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
    <Card class="w-48">
        <div v-if="stack.id !== undefined && stack.id !== null">
            <CardHeader>
                <CardTitle>{{ stack.title }}</CardTitle>
                <CardDescription>{{ stack.logs.length }} Logs</CardDescription>
            </CardHeader>
            <CardFooter class="flex justify-end mt-8">
                <NuxtLink :to="`/stacks/${stack.id}`">
                    <Button variant="outline" class="cursor-pointer">Öffnen</Button>
                </NuxtLink>
            </CardFooter>
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
            <CardFooter class="flex justify-end mt-8">
                <Button variant="outline" disabled>Lädt...</Button>
            </CardFooter>
        </div>
    </Card>
</template>