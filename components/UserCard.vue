<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['viewUser', 'editUser', 'deleteUser'])
</script>

<template>
    <NuxtLink>
        <ContextMenu>
            <ContextMenuTrigger class="w-fit">
                <Card class="w-60 py-4 text-center text-sm hover:bg-muted/50 transition-colors">
                    <CardHeader>
                        <CardTitle class="flex flex-col items-center gap-2">
                            <Avatar>
                                <AvatarFallback>{{ user.firstName.charAt(0).toUpperCase() +
                                    user.lastName.charAt(0).toUpperCase() }}
                                </AvatarFallback>
                            </Avatar>
                            <p class="break-all">{{ user.firstName + ' ' + user.lastName }}</p>
                        </CardTitle>
                        <CardDescription class="text-xs text-muted-foreground break-all">
                            {{ user.email }}
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="flex justify-center items-center">
                        <RoleBadge :user />
                    </CardContent>
                </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuLabel class="text-xs text-muted-foreground">Aktionen</ContextMenuLabel>
                <ContextMenuItem @click="emit('viewUser', user)">
                    <Icon name="tabler:eye" />Benutzer anzeigen
                </ContextMenuItem>
                <ContextMenuItem @click="emit('editUser', user)">
                    <Icon name="tabler:edit" />Benutzer bearbeiten
                </ContextMenuItem>
                <ContextMenuItem @click="emit('deleteUser', user)" variant="destructive">
                    <Icon name="tabler:trash" />Benutzer löschen
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    </NuxtLink>
</template>