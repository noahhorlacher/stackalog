<script setup>
useSeoMeta({
  title: 'Stackalog — Log'
})

const log = ref({
    id: null,
    name: '',
    category: '',
    subcategory: '',
    status: '',
    purchaseDate: '',
    value: 0,
    assignedTo: '',
    location: '',
    createdAt: '',
    serialNumber: '',
})

const { params } = useRoute()
const { data: logData, error: logError } = await useFetch(`http://localhost:5000/api/logs/${params.id}`)
if (logError.value) {
    toast('Fehler', {
        description: 'Fehler beim Laden des Logs. Kontaktieren Sie den Support.'
    })
} else if (!logData.value) {
    toast('Nicht gefunden', {
        description: 'Der angeforderte Log wurde nicht gefunden.'
    })
}

log.value = logData.value
</script>

<template>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/logs">Logs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{{ log.name }}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>

    <div class="space-y-2 my-6">
		<h1 class="text-3xl font-bold">{{ log.name }}</h1>
		<p class="text-muted-foreground">{{ log.category }}</p>
		<p class="text-muted-foreground text-sm">{{ log.subcategory }}</p>
	</div>
</template>