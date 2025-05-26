<script setup>
const stacks = [
    {
        id: null,
        title: 'Skeleton Test',
        logs: []
    },
    {
        id: 1,
        title: 'Hauptgebäude',
        logs: []
    },
    {
        id: 2,
        title: 'Schule',
        logs: []
    },
    {
        id: 3,
        title: 'Gebäude 2',
        logs: []
    },
    {
        id: 4,
        title: 'Defekt',
        logs: []
    },
]
</script>

<template>
    <h1 class="text-3xl mb-6">Stacks</h1>
    <div class="relative mb-12">
        <Icon name="tabler:search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
            type="text"
            placeholder="Suchen..."
            class="pl-10 pr-4"
        />
    </div>

    <div class="flex gap-8 flex-wrap">
        <StackCard v-for="(stack, index) of stacks" :stack="stack" :key="`stack-${index}`" />
    </div>
</template>