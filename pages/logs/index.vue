<script setup>
const logs = [
    {
        id: null,
        title: 'Skeleton Test',
    },
    {
        id: 1,
        title: 'Computer 1',
    },
    {
        id: 2,
        title: 'Computer 2',
    },
    {
        id: 3,
        title: 'Scangerät',
    },
    {
        id: 4,
        title: 'Secret Cyborg',
    },
]
</script>

<template>
    <h1 class="text-3xl mb-6">Logs</h1>
    <div class="relative mb-12">
        <Icon name="tabler:search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
            type="text"
            placeholder="Logs durchsuchen..."
            class="pl-10 pr-4"
        />
    </div>

    <div class="flex gap-8 flex-wrap">
        <LogCard v-for="(log, index) of logs" :log :key="`log-${index}`" />
    </div>
</template>