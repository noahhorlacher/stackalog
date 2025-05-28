<script setup>
const logSearchQuery = ref('')
const showAddModal = ref(false)

const logs = ref([
    { id: null, title: 'Skeleton Test' },
    { id: 1, title: 'Computer 1' },
    { id: 2, title: 'Computer 2' },
    { id: 3, title: 'Scangerät' },
    { id: 4, title: 'Secret Cyborg' }
])

// Form data for add/edit
const formData = reactive({
	title: ''
})

const filteredLogs = computed(() => {
  if (!logSearchQuery.value.trim()) return logs.value

  const query = logSearchQuery.value.toLowerCase()
  return logs.value.filter(log =>
    log.title.toLowerCase().includes(query)
  )
})

const resetForm = () => {
	formData.title = ''
}

const openAddModal = () => {
	resetForm()
	showAddModal.value = true
}

const closeModals = () => {
	showAddModal.value = false
	resetForm()
}

const saveLog = () => {
    const newLog = {
        id: Math.max(...logs.value.map(l => l.id)) + 1,
        title: formData.title
    }
    logs.value.push(newLog)
	closeModals()
}
</script>

<template>
    <div class="space-y-2 mb-6">
      <h1 class="text-3xl font-bold">Logs</h1>
      <p class="text-muted-foreground">Ihre Einträge</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-12">
		<div class="relative flex-1 max-w-md">
			<Icon name="tabler:search"
				class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
			<Input v-model="logSearchQuery" placeholder="Logs durchsuchen..." class="pl-10" />
		</div>
		<Button @click="openAddModal" class="flex items-center gap-2">
			<Icon name="tabler:plus" />
			Log hinzufügen
		</Button>
	</div>

    <div class="flex gap-8 flex-wrap">
        <div v-if="filteredLogs.length === 0" class="text-center py-12 mx-auto">
            <Icon name="tabler:logs" class="mx-auto text-muted-foreground" />
            <h3 class="mt-2 text-sm font-medium">Keine Logs gefunden</h3>
            <p class="mt-1 text-sm text-muted-foreground">
                {{ logSearchQuery ? 'Passen Sie Ihre Suche an' : 'Fügen Sie Ihren ersten Log hinzu' }}
            </p>
        </div>
        <LogCard v-else v-for="(log, index) of filteredLogs" :log :key="`log-${index}`" />
    </div>

    <!-- Add Log Dialog -->
	<Dialog v-model:open="showAddModal">
		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Log hinzufügen</DialogTitle>
			</DialogHeader>
			<form @submit.prevent="saveLog" class="space-y-4">
				<div class="space-y-2">
					<Label for="firstName">Titel</Label>
					<Input id="firstName" v-model="formData.title" required placeholder="Stack Titel eingeben" />
				</div>
				<DialogFooter class="gap-2">
					<Button type="button" variant="outline" @click="closeModals">
						Abbrechen
					</Button>
					<Button type="submit">Log hinzufügen</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
</template>