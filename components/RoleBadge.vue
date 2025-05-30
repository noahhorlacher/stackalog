<script setup>
const props = defineProps({
    user: Object
})

const getRoleVariant = isAdmin => isAdmin ? 'default' : 'outline'
const getRoleIcon = isAdmin => isAdmin ? 'tabler:shield-check' : 'tabler:user'
</script>

<template>
    <Badge :variant="getRoleVariant(user.isAdmin)">
        <Icon :name="getRoleIcon(user.isAdmin)" />
        {{ user.isAdmin ? 'Administrator' : 'Benutzer' }}
    </Badge>
</template>