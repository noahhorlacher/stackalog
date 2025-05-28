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
                    <CardTitle class="mb-6">
                        <div class="bg-muted p-2 w-fit rounded-md mb-3">
                            <div class="w-7 h-7"> 
                                <Icon :name="stack.icon" size="28" />
                            </div>
                        </div>
                        <p>{{ stack.title }}</p>
                    </CardTitle>
                    <CardDescription class="flex flex-col gap-y-2">
                        <div class="flex items-center justify-between">
                            <p class="text-muted-foreground">Logs</p>
                            <p class="text-foreground font-bold">{{ stack.logs.length }}</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <p class="text-muted-foreground">Wert</p>
                            <p class="text-foreground font-bold">Fr. 10'514.00</p>
                        </div>
                    </CardDescription>
                </CardHeader>
            </div>
            <div v-else>
                <CardHeader>
                    <CardTitle class="mb-6">
                        <Skeleton class="w-11 h-11 mb-2"></Skeleton>
                        <Skeleton class="h-4 w-full"></Skeleton>
                    </CardTitle>
                    <CardDescription>
                        <Skeleton class="h-3 mb-7"></Skeleton>
                        <Skeleton class="h-3"></Skeleton>
                    </CardDescription>
                </CardHeader>
            </div>
        </Card>
    </NuxtLink>
</template>