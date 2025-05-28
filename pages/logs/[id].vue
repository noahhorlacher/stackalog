<script setup>
const log = {
    id: 1,
    title: 'Ein Log'
}

useSeoMeta({
  title: 'Stackalog — Log'
})
</script>

<template>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/logs">Logs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{{ log.title }}</BreadcrumbPage>
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