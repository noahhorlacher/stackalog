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
        <p class="text-muted-foreground text-sm">ID</p>
        <p class="text-sm font-semibold font-mono bg-muted w-fit px-2 py-1 rounded">INV-{{ String(log.id).padStart(5, '0') }}</p>
        <p class="text-muted-foreground text-sm">Kategorie</p>
        <Badge>{{ log.category }}</Badge>
        <p class="text-muted-foreground text-sm">Unterkategorie</p>
        <Badge variant="outline">{{ log.subcategory }}</Badge>
        <p class="text-muted-foreground text-sm">Status</p>
        <Badge>{{ log.status }}</Badge>
        <p class="text-muted-foreground text-sm">Wert</p>
        <p class="text-lg font-semibold">Fr. {{
            log.value.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        }}</p>
        <p class="text-muted-foreground text-sm">Zugewiesen an</p>
        <p class="text-lg font-semibold">{{ log.assignedTo || '—' }}</p>
        <p class="text-muted-foreground text-sm">Ort</p>
        <p class="text-lg font-semibold">{{ log.location }}</p>
        <p class="text-muted-foreground text-sm">Seriennummer</p>
        <p class="text-lg font-semibold">{{ log.serialNumber || 'Keine Seriennummer' }}</p>
        <p class="text-muted-foreground text-sm">Erstellt am</p>
        <p class="text-lg font-semibold">{{ new Date(log.createdAt).toLocaleDateString('de-CH') }}</p>
    </div>
</template>