<script setup>
useSeoMeta({
  title: 'Stackalog — Stacks'
})

const stackSearchQuery = ref('')
const showAddModal = ref(false)

const stacks = ref([
  { id: null, title: 'Skeleton Test', icon: "", logs: [] },
  { id: 1, title: 'Hauptgebäude', icon: "tabler:building", logs: [] },
  { id: 2, title: 'Schule', icon: "tabler:building-community", logs: [] },
  { id: 3, title: 'Gebäude 2', icon: "tabler:building-bank", logs: [] },
  { id: 4, title: 'Defekt', icon: "tabler:error-404", logs: [1, 1, 1, 1] },
  { id: 5, title: 'Parkhaus', icon: "tabler:parking", logs: [] },
  { id: 6, title: 'Labor', icon: "tabler:flask", logs: [0, 1] },
  { id: 7, title: 'Serverraum', icon: "tabler:server", logs: [1] },
  { id: 8, title: 'Eingangshalle', icon: "tabler:door-enter", logs: [] },
  { id: 9, title: 'Werkstatt', icon: "tabler:tools", logs: [0, 0, 1] },
  { id: 10, title: 'Lager', icon: "tabler:box", logs: [] },
  { id: 11, title: 'Kantine', icon: "tabler:building-arch", logs: [1, 0] },
  { id: 12, title: 'Konferenzraum', icon: "tabler:layout-grid", logs: [] },
  { id: 13, title: 'Archiv', icon: "tabler:archive", logs: [0] },
  { id: 14, title: 'Rezeption', icon: "tabler:bell", logs: [] },
  { id: 15, title: 'Fitnessraum', icon: "tabler:armchair", logs: [0, 0] },
  { id: 16, title: 'Sicherheitsbüro', icon: "tabler:shield-lock", logs: [1, 1, 0] },
  { id: 17, title: 'Dachterrasse', icon: "tabler:sun", logs: [] },
  { id: 18, title: 'Fahrradkeller', icon: "tabler:bike", logs: [] },
  { id: 19, title: 'Heizungsraum', icon: "tabler:flame", logs: [1] },
  { id: 20, title: 'Waschraum', icon: "tabler:wash", logs: [] }
])


// Form data for add/edit
const formData = reactive({
	title: '',
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
    const newLog = {
        id: Math.max(...stacks.value.map(l => l.id)) + 1,
        title: formData.title,
        logs: []
    }
    stacks.value.push(newLog)
	closeModals()
}
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

    <div class="grid grid-cols-5 gap-8">
        <div v-if="filteredStacks.length === 0" class="text-center py-12 mx-auto">
            <Icon name="tabler:stack" class="mx-auto text-muted-foreground" />
            <h3 class="mt-2 text-sm font-medium">Keine Stacks gefunden</h3>
            <p class="mt-1 text-sm text-muted-foreground">
                {{ stackSearchQuery ? 'Passen Sie Ihre Suche an' : 'Fügen Sie Ihren ersten Stack hinzu' }}
            </p>
        </div>
        <StackCard v-else v-for="(stack, index) of filteredStacks" :stack :key="`stack-${index}`" />
    </div>

    <!-- Add Stack Dialog -->
	<Dialog v-model:open="showAddModal">
		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Stack hinzufügen</DialogTitle>
			</DialogHeader>
			<form @submit.prevent="saveStack" class="space-y-4">
				<div class="space-y-2">
					<Label for="firstName">Titel</Label>
					<Input id="firstName" v-model="formData.title" required placeholder="Stack Titel eingeben" />
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