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
    <Card class="w-48">
        <div v-if="log.id !== undefined && log.id !== null">
            <CardHeader>
                <CardTitle>{{ log.title }}</CardTitle>
            </CardHeader>
            <CardFooter class="flex justify-end mt-8">
                <NuxtLink :to="`/logs/${log.id}`">
                    <Button variant="outline" class="cursor-pointer">Öffnen</Button>
                </NuxtLink>
            </CardFooter>
        </div>
        <div v-else>
            <CardHeader>
                <CardTitle>
                    <Skeleton class="h-4 w-full"></Skeleton>
                </CardTitle>
            </CardHeader>
            <CardFooter class="flex justify-end mt-8">
                <Button variant="outline" disabled>Lädt...</Button>
            </CardFooter>
        </div>
    </Card>
</template>