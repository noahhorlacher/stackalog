<script setup>
const props = defineProps({
    log: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['editLog', 'deleteLog', 'addLogToStack'])
</script>

<template>
    <NuxtLink :to="`/logs/${log.id}`">
        <ContextMenu>
            <ContextMenuTrigger class="w-fit">
                <Card class="w-60 pt-4 text-center text-sm hover:bg-muted/50 transition-colors">
                    <CardHeader>
                        <CardTitle class="gap-2 mb-4 font-mono bg-muted/80 w-fit mx-auto px-2 py-1 rounded">
                            <p class="break-all">{{ log.id ? 'INV-' + String(log.id).padStart(5, '0') : 'Unbekannt' }}</p>
                        </CardTitle>
                        <CardDescription class="text-lg text-foreground break-all">
                            {{ log.name || 'Unbekannt' }}
                            <p class="text-sm text-muted-foreground">{{ log.value ? 'Fr. ' + log.value.toLocaleString('de-CH', {
                                minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Unbekannt' }}</p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="flex justify-center gap-2 items-center">
                            <Badge class="text-xs">
                                {{ log.category || 'Unbekannt' }}
                            </Badge>
                            <Badge variant="secondary" class="text-xs">
                                {{ log.subcategory || 'Unbekannt' }}
                            </Badge>
                        </div>

                        <div class="flex justify-between items-center text-xs mt-8">
                            <p class="text-muted-foreground">Zuweisung</p>
                            <p class="font-bold">{{ log.assignedTo || '—' }}</p>
                        </div>
                        <div class="flex justify-between items-center text-xs">
                            <p class="text-muted-foreground">Ort</p>
                            <p class="font-bold">{{ log.location || 'Unbekannt' }}</p>
                        </div>
                    </CardContent>
                </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuLabel class="text-xs text-muted-foreground">Aktionen</ContextMenuLabel>
                <ContextMenuItem @click="emit('addLogToStack', log)">
                    <Icon name="tabler:plus" />Zu Stack hinzufügen
                </ContextMenuItem>
                <ContextMenuItem @click="emit('editLog', log)">
                    <Icon name="tabler:edit" />Log bearbeiten
                </ContextMenuItem>
                <ContextMenuItem @click="emit('deleteLog', log)" variant="destructive">
                    <Icon name="tabler:trash" />Log löschen
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    </NuxtLink>
</template>