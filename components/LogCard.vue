<script setup>
const props = defineProps({
    log: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['viewLog', 'editLog', 'deleteLog'])
</script>

<template>
    <NuxtLink>
        <ContextMenu>
            <ContextMenuTrigger class="w-fit">
                <Card class="w-60 pt-4 text-center text-sm hover:bg-muted/50 transition-colors">
                    <CardHeader>
                        <CardTitle class="flex flex-col items-center gap-2">
                            <p class="break-all">INV-{{ log.id }}</p>
                        </CardTitle>
                        <CardDescription class="text-xs text-muted-foreground break-all">
                            {{ log.name }}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="flex justify-center gap-2 items-center">
                            <Badge class="text-xs">
                                {{ log.category }}
                            </Badge>
                            <Badge variant="secondary" class="text-xs">
                                {{ log.subcategory }}
                            </Badge>
                        </div>

                        <div class="flex justify-between items-center text-xs mt-8">
                            <p class="text-muted-foreground">Zuweisung</p>
                            <p class="font-bold">{{ log.assignedTo }}</p>
                        </div>
                        <div class="flex justify-between items-center text-xs">
                            <p class="text-muted-foreground">Ort</p>
                            <p class="font-bold">{{ log.location }}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div class="flex justify-end w-full">
                            <p class="text-lg font-bold text-violet-400">Fr. {{ log.value.toLocaleString('de-CH', {
                                minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</p>
                        </div>
                    </CardFooter>
                </Card>
            </ContextMenuTrigger>
            <ContextMenuContent align="end">
                <ContextMenuLabel class="text-xs text-muted-foreground">Aktionen</ContextMenuLabel>
                <ContextMenuItem @click="emit('viewLog', user)">
                    <Icon name="tabler:eye" />Log anzeigen
                </ContextMenuItem>
                <ContextMenuItem @click="emit('editLog', user)">
                    <Icon name="tabler:edit" />Log bearbeiten
                </ContextMenuItem>
                <ContextMenuItem @click="emit('deleteLog', user)" variant="destructive">
                    <Icon name="tabler:trash" />Log löschen
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    </NuxtLink>
</template>