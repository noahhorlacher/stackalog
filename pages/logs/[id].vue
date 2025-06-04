<script setup>
import { toast } from 'vue-sonner'

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
const { data: logData, error: logError } = await useFetch(`/api/logs/${params.id}`)

if (logError.value) {
    toast('Fehler', {
        description: 'Fehler beim Laden des Logs. Kontaktieren Sie den Support.'
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
        <h1 class="text-3xl font-bold">{{ log.name || 'Unbekannt' }}</h1>
        <p class="text-muted-foreground text-sm">ID</p>
        <p class="text-sm font-semibold font-mono bg-muted w-fit px-2 py-1 rounded">{{ log.id ? 'INV-' + String(log.id).padStart(5, '0') : 'Unbekannt' }}</p>
        <p class="text-muted-foreground text-sm">Kategorie</p>
        <Badge>{{ log.category || 'Unbekannt' }}</Badge>
        <p class="text-muted-foreground text-sm">Unterkategorie</p>
        <Badge variant="secondary">{{ log.subcategory || 'Unbekannt' }}</Badge>
        <p class="text-muted-foreground text-sm">Status</p>
        <Badge>{{ log.status || 'Unbekannt' }}</Badge>
        <p class="text-muted-foreground text-sm">Wert</p>
        <p class="text-lg font-semibold">{{ log.value ? 'Fr. ' +
            log.value.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : 'Unbekannt' }}</p>
        <p class="text-muted-foreground text-sm">Zugewiesen an</p>
        <p class="text-lg font-semibold">{{ log.assignedTo || 'Unbekannt' }}</p>
        <p class="text-muted-foreground text-sm">Ort</p>
        <p class="text-lg font-semibold">{{ log.location || 'Unbekannt' }}</p>
        <p class="text-muted-foreground text-sm">Seriennummer</p>
        <p class="text-lg font-semibold">{{ log.serialNumber || 'Keine Seriennummer' }}</p>
        <p class="text-muted-foreground text-sm">Erstellt am</p>
        <p class="text-lg font-semibold">{{ log.createdAt ? new Date(log.createdAt).toLocaleDateString('de-CH') : 'Unbekannt' }}</p>
    </div>
</template>