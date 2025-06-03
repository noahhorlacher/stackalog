<script setup>
import { toast } from 'vue-sonner'

useSeoMeta({
	title: 'Stackalog — Stacks'
})

const stackSearchQuery = ref('')
const showAddModal = ref(false)

const stacks = ref([])


const { data: stacksData, error: stacksError } = await useFetch('http://localhost:5000/api/stacks/')
if (stacksError.value){
	toast('Fehler', {
	description: 'Fehler beim Laden der Logs. Kontaktieren Sie den Support.'
})
} else {
	stacks.value = stacksData.value.map(s => { return { ...s, logs: [] } })
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
	formData.logs = []
}

const openAddModal = () => {
	resetForm()
	showAddModal.value = true
}

const closeModals = () => {
	showAddModal.value = false
	resetForm()
}

const saveStack = () => {
	$fetch('http://localhost:5000/api/stacks/', {
		method: 'POST',
		body: formData
	}).then(() => {
		toast('Erfolg', {
			description: 'Stack erfolgreich hinzugefügt'
		})

		const newLog = {
			id: Math.max(...stacks.value.map(l => l.id)) + 1,
			title: formData.title,
			description: formData.description,
			logs: []
		}

		stacks.value.push(newLog)
	}).catch(err => {
		toast('Fehler', {
			description: err.message || 'Beim Hinzufügen des Stacks ist ein Fehler aufgetreten'
		})
	}).finally(() => {
		closeModals()
	})
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

	<div class="flex flex-row gap-8 justify-center flex-wrap">
		<div v-if="filteredStacks.length === 0" class="text-center py-12 mx-auto">
			<Icon name="tabler:stack" class="mx-auto text-muted-foreground" />
			<h3 class="mt-2 text-sm font-medium">Keine Stacks gefunden</h3>
			<p class="mt-1 text-sm text-muted-foreground">
				{{ stackSearchQuery ? 'Passen Sie Ihre Suche an' : 'Fügen Sie Ihren ersten Stack hinzu' }}
			</p>
		</div>
		<StackCard v-else v-for="(stack, index) of paginatedStacks" :stack :key="`stack-${index}`" />
	</div>

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
</template>