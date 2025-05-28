<script setup>
useSeoMeta({
  title: 'Stackalog — Stack'
})

const stack = {
    id: 1,
    title: 'Hauptgebäude',
    logs: [

    ]
}
</script>

<template>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/stacks">Stacks</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{{ stack.title }}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>

    <div class="relative mt-6 mb-12">
        <Icon name="tabler:search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
            type="text"
            placeholder="Suchen..."
            class="pl-10 pr-4"
        />
    </div>
</template>