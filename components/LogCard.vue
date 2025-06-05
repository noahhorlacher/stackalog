<script setup>
const props = defineProps({
    log: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['editLog', 'deleteLog', 'addLogToStack'])

const getStatusColor = () => {
    switch (props.log.status) {
        case 'Verfügbar':
            return 'bg-green-400 text-green-400';
        case 'In Reparatur':
            return 'bg-yellow-400 text-yellow-400';
        case 'Verwendet':
            return 'bg-violet-400 text-violet-400';
        case 'Defekt':
            return 'bg-red-400 text-red-400';
        default:
            return 'bg-muted-foreground text-muted-foreground';
    }
}

const getStatusIcon = () => {
    switch (props.log.status) {
        case 'Verfügbar':
            return 'tabler:check';
        case 'In Reparatur':
            return 'tabler:tools';
        case 'Verwendet':
            return 'tabler:clock';
        case 'Defekt':
            return 'tabler:alert-triangle';
        default:
            return 'tabler:question-mark';
    }
}
</script>

<template>
    <NuxtLink :to="`/logs/${log.id}`">
        <ContextMenu>
            <ContextMenuTrigger class="w-fit">
                <Card class="w-86 pt-4 text-center text-sm hover:bg-muted/50 transition-all group shadow-foreground/8 shadow-sm hover:shadow-xl">
                    <CardHeader>
                        <CardTitle class="mb-4 gap-2 flex justify-between items-center w-full">
                            <div class="relative flex items-center gap-2 font-mono bg-muted/80 px-2 py-1 rounded">
                                <div :class="getStatusColor()" class="absolute animate-pulse group-hover:animate-none left-2 w-2 h-2 bg-current rounded-full"></div>
                                <div :class="getStatusColor()" class="w-2 h-2 animate-pulse group-hover:animate-ping bg-current rounded-full"></div>
                                <p class="break-all">{{ log.id ? 'INV-' + String(log.id).padStart(5, '0') : 'Unbekannt'
                                    }}</p>
                            </div>
                            <div class="flex justify-center gap-2 items-center">
                                <Badge v-if="!log.category || log.category === 'Unkategorisiert'" class="text-xs">
                                    {{ log.category || 'Unkategorisiert' }}
                                </Badge>
                                <Badge v-else-if="!log.subcategory" variant="secondary" class="text-xs">
                                    {{ log.category }} 
                                </Badge>
                                <div v-else>
                                    <Badge variant="secondary" class="text-xs">
                                        <p>{{ log.subcategory }}</p>
                                    </Badge>
                                </div>
                            </div>
                        </CardTitle>
                        <CardDescription class="text-lg text-foreground mt-4">
                            <Tooltip>
                                <TooltipTrigger class="cursor-pointer">
                                    <div :class="['font-light p-2 w-12 h-12 items-center flex justify-center rounded-lg shadow-current/30 shadow-lg', getStatusColor()]">
                                        <Icon class="text-black" :name="getStatusIcon()" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{{ log.status || 'Unbekannt' }}</p>
                                </TooltipContent>
                            </Tooltip>

                            <p class="mt-4">{{ log.name || 'Unbekannt' }}</p>
                            <p class="text-sm text-muted-foreground">{{ log.value ? 'Fr. ' +
                                log.value.toLocaleString('de-CH', {
                                    minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Unbekannter Wert' }}</p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="flex justify-between items-center text-xs mt-4">
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