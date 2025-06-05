<script setup>
import { toast } from 'vue-sonner'

useSeoMeta({
	title: 'Stackalog — Stacks'
})

const stackSearchQuery = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedStack = ref(null)
const showDeleteModal = ref(false)

const stacks = ref([])

const logs = ref([])

const { data: logsData, error: logsError } = await useFetch('/api/logs/')
if(logsError.value){
  toast('Fehler', {
    description: 'Fehler beim Laden der Logs. Kontaktieren Sie den Support.'
  })
} else {
  logs.value = logsData.value.reverse()
}

const { data: stacksData, error: stacksError } = await useFetch('/api/stacks/')
if (stacksError.value){
	toast('Fehler', {
	description: 'Fehler beim Laden der Stacks. Kontaktieren Sie den Support.'
})
} else {
	stacks.value = stacksData.value.map(s => { return { ...s, logs: [] } }).reverse()
}

// Form data for add/edit
const formData = reactive({
	title: '',
	description: '',
	logs: []
})

const filteredStacks = computed(() => {
	if (!stackSearchQuery.value.trim()) return stacks.value

	const query = stackSearchQuery.value.toLowerCase()
	return stacks.value.filter(stack =>
		stack.title.toLowerCase().includes(query)
	)
})

const resetForm = () => {
	formData.title = ''
	formData.description = ''
	formData.logs = []
	selectedStack.value = null
}

const openAddModal = () => {
	resetForm()
	showAddModal.value = true
}

const openEditModal = stack => {
	resetForm()
	showEditModal.value = true
	selectedStack.value = stack
	formData.title = stack.title
	formData.description = stack.description
}

const openDeleteModal = stack => {
	selectedStack.value = stack
	showDeleteModal.value = true
}

const closeModals = () => {
	showAddModal.value = false
	showEditModal.value = false
	resetForm()
}

const saveStack = () => {
	$fetch('/api/stacks/', {
		method: 'POST',
		body: { ...formData }
	}).then(response => {
		toast('Erfolg', {
			description: 'Stack erfolgreich hinzugefügt'
		})

		const newLog = { ...formData, id: response.id }

		stacks.value.unshift(newLog)
	}).catch(err => {
		toast('Fehler', {
			description: err.message || 'Beim Hinzufügen des Stacks ist ein Fehler aufgetreten'
		})
	}).finally(closeModals)
}

const deleteStack = () => {
	$fetch('/api/stacks/' + selectedStack.value.id, {
		method: 'DELETE'
	}).then(() => {
		toast('Erfolg', {
			description: 'Stack erfolgreich gelöscht'
		})

		const index = stacks.value.findIndex(s => s.id === selectedStack.value.id)
		stacks.value.splice(index, 1)
	}).catch(err => {
		toast('Fehler', {
			description: err.message || 'Beim Löschen des Stacks ist ein Fehler aufgetreten'
		})
	}).finally(closeModals)
}

const updateStack = () => {
	$fetch('/api/stacks/' + selectedStack.value.id, {
		method: 'PUT',
		body: { ...formData }
	}).then(() => {
		toast('Erfolg', {
			description: 'Stack erfolgreich aktualisiert'
		})

		const index = stacks.value.findIndex(s => s.id === selectedStack.value.id)
		if (index !== -1) {
			stacks.value[index] = { ...stacks.value[index], ...formData }
		}
	}).catch(err => {
		toast('Fehler', {
			description: err.message || 'Beim Aktualisieren des Stacks ist ein Fehler aufgetreten'
		})
	}).finally(closeModals)
}

const currentPage = ref(1)
const itemsPerPage = ref(10)

const paginatedStacks = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value
	const end = start + itemsPerPage.value
	return filteredStacks.value.slice(start, end)
})

const totalPages = computed(() =>
	Math.ceil(filteredStacks.value.length / itemsPerPage.value)
)

const goToPage = (page) => {
	currentPage.value = page
}

watch(stackSearchQuery, () => {
	currentPage.value = 1
})
</script>


<template>
	<div class="space-y-2 mb-6">
		<h1 class="text-3xl font-bold">Stacks</h1>
		<p class="text-muted-foreground">Ihre Ordner</p>
	</div>

	<!-- new stats -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
		<StatCard icon="tabler:stack">
			<template #title>Totale Stacks</template>
			<template #description>Gesamtanzahl der Ordner</template>
			<template #value>{{ stacks.length }}</template>
		</StatCard>

		<StatCard icon="tabler:logs" color="green">
			<template #title>Totale Logs</template>
			<template #description>In allen Kategorien</template>
			<template #value>{{ logs.length }}</template>
		</StatCard>

		<StatCard icon="tabler:wallet" color="violet">
			<template #title>Totaler Wert</template>
			<template #description>Vermögensbewertung aller Logs</template>
			<template #value>Fr. {{logs.reduce((a, log) => a + (log.value || 0), 0).toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</template>
		</StatCard>
	</div>

	<!-- search -->
	<Card class="mb-12">
		<CardContent>
			<div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
				<div class="relative flex-1 max-w-md">
					<Icon name="tabler:search"
						class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
					<Input v-model="stackSearchQuery" placeholder="Stacks durchsuchen..." class="pl-10" />
				</div>
				<div>
					<Button @click="openAddModal" class="flex items-center">
						<Icon name="tabler:plus" />
						Stack hinzufügen
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>

	<!-- empty state -->
	<div v-if="filteredStacks.length === 0" class="text-center py-12 mx-auto">
		<Icon name="tabler:stack" class="mx-auto text-muted-foreground" />
		<h3 class="mt-2 text-sm font-medium">Keine Stacks gefunden</h3>
		<p class="mt-1 text-sm text-muted-foreground">
			{{ stackSearchQuery ? 'Passen Sie Ihre Suche an' : 'Fügen Sie Ihren ersten Stack hinzu' }}
		</p>
	</div>
	
	<!-- stacks -->
	<ScrollArea v-else class="h-[600px]">
		<div class="flex flex-wrap gap-8 justify-center items-start">
			<StackCard v-for="(stack, index) of paginatedStacks" :stack :key="`stack-${index}`" @deleteStack="openDeleteModal" @editStack="openEditModal" />
		</div>
	</ScrollArea>

	<!-- pagination -->
	<div class="w-full flex mt-4 gap-2 justify-end items-center">
		<Button variant="outline" size="sm" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
			<Icon name="tabler:chevron-left" />
		</Button>

		<div class="text-sm text-muted-foreground">
			{{ currentPage }}/{{ totalPages }}
		</div>

		<Button variant="outline" size="sm" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
			<Icon name="tabler:chevron-right" />
		</Button>
	</div>

	<!-- Add Stack Dialog -->
	<Dialog v-model:open="showAddModal">
		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Stack hinzufügen</DialogTitle>
			</DialogHeader>
			<form @submit.prevent="saveStack" class="space-y-4">
				<div class="space-y-2">
					<Label for="title">Titel</Label>
					<Input id="title" v-model="formData.title" required placeholder="Stack Titel eingeben" />
				</div>
				<div class="space-y-2">
					<Label for="description">Beschreibung</Label>
					<Textarea id="description" v-model="formData.description" required
						placeholder="Stack beschreiben" />
				</div>
				<DialogFooter class="gap-2">
					<Button type="button" variant="outline" @click="closeModals">
						Abbrechen
					</Button>
					<Button type="submit">Stack hinzufügen</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>

	<!-- Edit Stack Dialog -->
	<Dialog v-model:open="showEditModal">
		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Stack bearbeiten</DialogTitle>
			</DialogHeader>
			<form @submit.prevent="updateStack" class="space-y-4">
				<div class="space-y-2">
					<Label for="title">Titel</Label>
					<Input id="title" v-model="formData.title" required placeholder="Stack Titel eingeben" />
				</div>
				<div class="space-y-2">
					<Label for="description">Beschreibung</Label>
					<Textarea id="description" v-model="formData.description" required
						placeholder="Stack beschreiben" />
				</div>
				<DialogFooter class="gap-2">
					<Button type="button" variant="outline" @click="closeModals">
						Abbrechen
					</Button>
					<Button type="submit">Änderungen speichern</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>

	<!-- Delete Confirmation Dialog -->
	<AlertDialog v-model:open="showDeleteModal">
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Stack löschen</AlertDialogTitle>
				<p>Sind Sie sich sicher, dass Sie den Stack <strong>{{ selectedStack.title }}</strong> löschen möchten?</p>
				<AlertDialogDescription>
					Diese Aktion kann nicht rückgängig gemacht werden.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel @click="closeModals">Abbrechen</AlertDialogCancel>
				<AlertDialogAction @click="deleteStack" class="bg-destructive text-white hover:bg-destructive/90">
					Stack löschen
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>