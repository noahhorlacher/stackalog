<script setup>
const props = defineProps({
    stack: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['editStack', 'deleteStack'])
</script>

<template>
    <NuxtLink v-if="stack.id !== undefined && stack.id !== null" :to="`/stacks/${stack.id}`">
        <ContextMenu>
            <ContextMenuTrigger class="w-fit">
                <Card class="w-86 hover:bg-muted/50 transition-all shadow-foreground/8 shadow-sm hover:shadow-xl">
                    <div>
                        <CardHeader>
                            <CardTitle class="mb-4 break-all flex items-center gap-4">
                                <div
                                    class="flex items-center bg-gradient-to-br from-blue-500 to-violet-500 p-3 rounded-md shadow-md shadow-violet-500/30">
                                    <Icon name="tabler:stack" class="text-white" size="24" />
                                </div>
                                <div>
                                    <p class="text-lg">{{ stack.title }}</p>
                                    <p class="text-xs font-light text-muted-foreground">{{ stack.description }}</p>
                                </div>
                            </CardTitle>
                            <CardDescription class="flex flex-col gap-0">
                                        <div class="flex items-center justify-between">
                                            <p class="text-muted-foreground text-xs">Totaler Wert</p>
                                            <div
                                                class="flex items-center bg-gradient-to-br from-blue-500 to-violet-500 p-1 rounded-md shadow-md shadow-violet-500/20">
                                                <Icon name="tabler:wallet" class="text-white" size="16" />
                                            </div>
                                        </div>
                                        <p class="font-bold text-2xl text-foreground">Fr. {{stack.logs.reduce((a, log) =>
                                            a + (log.value || 0), 0).toLocaleString('de-CH', {
                                                minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                            })}}</p>

                                        <div class="flex items-center justify-between mt-2">
                                            <p class="text-muted-foreground text-xs">Logs</p>
                                            <div
                                                class="flex items-center bg-gradient-to-br from-green-500 to-emerald-500 p-1 rounded-md shadow-md shadow-emerald-500/20">
                                                <Icon name="tabler:logs" class="text-white" size="16" />
                                            </div>
                                        </div>

                                        <p class="text-foreground font-bold text-2xl flex items-center gap-1"><Icon name="tabler:file-barcode" />{{ stack.logs.length }}</p>
                            </CardDescription>
                        </CardHeader>
                    </div>
                </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuLabel class="text-xs text-muted-foreground">Aktionen</ContextMenuLabel>
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