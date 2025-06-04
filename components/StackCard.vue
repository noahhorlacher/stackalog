<script setup>
const props = defineProps({
    stack: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['viewLog', 'editLog', 'deleteLog'])
</script>

<template>
    <NuxtLink v-if="stack.id !== undefined && stack.id !== null" :to="`/stacks/${stack.id}`">
        <ContextMenu>
            <ContextMenuTrigger class="w-fit">
                <Card class="w-48 hover:bg-muted/50 transition-colors">
                    <div>
                        <CardHeader>
                            <CardTitle class="mb-4 break-all">
                                <p>{{ stack.title }}</p>
                                <p class="text-xs mt-2 text-muted-foreground">{{ stack.description }}</p>
                            </CardTitle>
                            <CardDescription class="flex flex-col gap-y-2">
                                <div class="flex items-center justify-between">
                                    <p class="text-muted-foreground">Logs</p>
                                    <p class="text-foreground font-bold">{{ stack.logs.length }}</p>
                                </div>
                                <div class="flex items-center justify-between">
                                    <p class="text-muted-foreground">Wert</p>
                                    <p class="text-foreground font-bold">Fr. {{stack.logs.reduce((a, log) => a +
                                        (log.value || 0),
                                        0).toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2
                                        })}}</p>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </div>
                </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuLabel class="text-xs text-muted-foreground">Aktionen</ContextMenuLabel>
                <ContextMenuItem @click="emit('viewStack', stack)">
                    <Icon name="tabler:eye" />Stack anzeigen
                </ContextMenuItem>
                <ContextMenuItem @click="emit('editStack', stack)">
                    <Icon name="tabler:edit" />Stack bearbeiten
                </ContextMenuItem>
                <ContextMenuItem @click="emit('deleteStack', stack)" variant="destructive">
                    <Icon name="tabler:trash" />Stack löschen
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    </NuxtLink>

    <Card v-else class="w-48">
        <CardHeader>
            <CardTitle class="mb-5">
                <Skeleton class="h-4 w-full"></Skeleton>
                <Skeleton class="h-2 mt-3 w-full"></Skeleton>
                <Skeleton class="h-2 mt-2 w-full"></Skeleton>
            </CardTitle>
            <CardDescription>
                <Skeleton class="h-3 mb-5"></Skeleton>
                <Skeleton class="h-3"></Skeleton>
            </CardDescription>
        </CardHeader>
    </Card>
</template>