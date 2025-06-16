<script setup>
import { CalendarDate, parseDate, getLocalTimeZone, today } from '@internationalized/date'
import { toast } from 'vue-sonner'

useSeoMeta({
  title: 'Stackalog — Logs'
})

const logSearchQuery = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedLog = ref(null)
const showDeleteModal = ref(false)
const showAddToStackModal = ref(false)
const addToLogStackComboboxValue = ref('')

const logs = ref([])
const stacks = ref([])

const { data: logsData, error: logsError } = await useFetch('/api/logs/')
if (logsError.value) {
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
  name: '',
  category: 'Unkategorisiert',
  subcategory: '',
  status: 'Verfügbar',
  assignedTo: '—',
  location: 'Unbekannt',
  purchaseDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD string
  value: 0,
  serialNumber: ''
})

// Computed bridge for Calendar component
const purchaseDateCalendar = computed({
  get() {
    return formData.purchaseDate ? parseDate(formData.purchaseDate) : undefined
  },
  set(value) {
    formData.purchaseDate = value ? value.toString() : ''
  }
})

const filteredLogs = computed(() => {
  if (!logSearchQuery.value.trim()) return logs.value

  const query = logSearchQuery.value.toLowerCase()
  return logs.value.filter(log =>
    log.name.toLowerCase().includes(query)
  )
})

const resetForm = () => {
  formData.name = ''
  formData.category = 'Unkategorisiert'
  formData.subcategory = ''
  formData.status = 'Verfügbar'
  formData.assignedTo = '—'
  formData.location = 'Unbekannt'
  formData.purchaseDate = new Date().toISOString().split('T')[0]
  formData.value = 0
  formData.serialNumber = ''
}

const openAddModal = () => {
  resetForm()
  showAddModal.value = true
}

const openEditModal = log => {
  resetForm()
  showEditModal.value = true
  selectedLog.value = log
  formData.name = log.name
  formData.category = log.category || 'Unkategorisiert'
  formData.subcategory = log.subcategory || ''
  formData.status = log.status || 'Verfügbar'
  formData.assignedTo = log.assignedTo || '—'
  formData.location = log.location || 'Unbekannt'
  formData.purchaseDate = log.purchaseDate ? log.purchaseDate.split('T')[0] : new Date().toISOString().split('T')[0]
  formData.value = log.value || 0
  formData.serialNumber = log.serialNumber || ''
}

const openDeleteModal = stack => {
  selectedLog.value = stack
  showDeleteModal.value = true
}

const closeModals = () => {
  showAddModal.value = false
  showEditModal.value = false
  showDeleteModal.value = false
  resetForm()
}

const openAddToStackModal = log => {
  selectedLog.value = log
  showAddToStackModal.value = true
}

const saveLog = async () => {
  try {
    const { data, error } = await useFetch('/api/logs/', {
      method: 'POST',
      body: {
        ...formData,
        purchaseDate: formData.purchaseDate
      }
    })

    if (error.value) throw error.value

    const newLog = { ...formData, id: data.value.id }
    logs.value.unshift(newLog)

    toast('Erfolg', {
      description: 'Log erfolgreich hinzugefügt'
    })
  } catch (err) {
    toast('Error', {
      description: err.message
    })
  } finally {
    closeModals()
  }
}

const deleteLog = async () => {
  try {
    const { error } = await useFetch('/api/logs/' + selectedLog.value.id, {
      method: 'DELETE'
    })

    if (error.value) throw error.value

    toast('Erfolg', {
      description: 'Log erfolgreich gelöscht'
    })

    const index = logs.value.findIndex(l => l.id === selectedLog.value.id)
    logs.value.splice(index, 1)
  } catch (err) {
    toast('Fehler', {
      description: err.message || 'Beim Löschen des Logs ist ein Fehler aufgetreten'
    })
  } finally {
    closeModals()
  }
}

const updateLog = async () => {
  try {
    const { error } = await useFetch('/api/logs/' + selectedLog.value.id, {
      method: 'PUT',
      body: {
        ...formData,
        purchaseDate: formData.purchaseDate // already YYYY-MM-DD
      }
    })

    if (error.value) throw error.value

    toast('Erfolg', {
      description: 'Log erfolgreich aktualisiert'
    })

    const index = logs.value.findIndex(s => s.id === selectedLog.value.id)
    if (index !== -1) {
      logs.value[index] = { ...logs.value[index], ...formData }
    }
  } catch (err) {
    toast('Fehler', {
      description: err.message || 'Beim Aktualisieren des Logs ist ein Fehler aufgetreten'
    })
  } finally {
    closeModals()
  }
}

const currentPage = ref(1)
const itemsPerPage = ref(10)

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredLogs.value.slice(start, end)
})

const totalPages = computed(() =>
  Math.ceil(filteredLogs.value.length / itemsPerPage.value)
)

const goToPage = (page) => {
  currentPage.value = page
}

watch(logSearchQuery, () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="space-y-2 mb-6">
    <h1 class="text-3xl font-bold">Logs</h1>
    <p class="text-muted-foreground">Ihre Einträge</p>
  </div>

  <!-- stats -->
  <div class="mb-8 grid grid-cols-4 gap-4">
    <StatCard icon="tabler:logs">
      <template #title>Totale Logs</template>
      <template #description>In allen Kategorien</template>
      <template #value>{{ logs.length }}</template>
    </StatCard>

    <StatCard color="green" icon="tabler:graph">
      <template #title>Verfügbar</template>
      <template #description>Bereit für den Einsatz</template>
      <template #value>{{logs.filter(l => l.status === "Verfügbar").length}}</template>
    </StatCard>

    <StatCard color="yellow" icon="tabler:users">
      <template #title>Defekt</template>
      <template #description>Defekt oder in Reparatur</template>
      <template #value>{{logs.filter(l => ["Defekt", "In Reparatur"].includes(l.status)).length}}</template>
    </StatCard>

    <StatCard color="violet" icon="tabler:wallet">
      <template #title>Totaler Wert</template>
      <template #description>Vermögensbewertung</template>
      <template #value>Fr. {{logs.reduce((a, log) => a + (log.value || 0),
        0).toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</template>
    </StatCard>
  </div>

  <!-- search -->
  <Card class="mb-12">
    <CardContent>
      <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div class="relative flex-1 max-w-md">
          <Icon name="tabler:search"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input v-model="logSearchQuery" placeholder="Logs durchsuchen..." class="pl-10" />
        </div>
        <CTAButton @click="openAddModal" class="flex items-center">
          <Icon name="tabler:plus" />
          Log hinzufügen
        </CTAButton>
      </div>
    </CardContent>
  </Card>


  <div class="flex gap-8 flex-wrap">
    <!-- empty state -->
    <div v-if="filteredLogs.length === 0" class="text-center py-12 mx-auto">
      <Icon name="tabler:logs" class="mx-auto text-muted-foreground" />
      <h3 class="mt-2 text-sm font-medium">Keine Logs gefunden</h3>
      <p class="mt-1 text-sm text-muted-foreground">
        {{ logSearchQuery ? 'Passen Sie Ihre Suche an' : 'Fügen Sie Ihren ersten Log hinzu' }}
      </p>
    </div>

    <!-- logs -->
    <div v-else class="mx-auto w-full max-w-7xl">
      <ScrollArea class="h-[600px]">
        <div class="flex flex-wrap gap-8 justify-center items-start">
          <LogCard :log v-for="(log, index) in paginatedLogs" :key="`log-${index}`" @deleteLog="openDeleteModal"
            @editLog="openEditModal" @addLogToStack="openAddToStackModal" />
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
    </div>

  </div>

  <!-- Add Log Dialog -->
  <Dialog v-model:open="showAddModal">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Log hinzufügen</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="saveLog" class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input id="name" v-model="formData.name" required placeholder="Log Name eingeben" />
        </div>
        <div class="space-y-2">
          <Label for="category">Kategorie</Label>
          <Input id="category" v-model="formData.category" placeholder="Kategorie eingeben" />
        </div>
        <div class="space-y-2">
          <Label for="subcategory">Unterkategorie</Label>
          <Input id="subcategory" v-model="formData.subcategory" placeholder="Unterkategorie eingeben" />
        </div>
        <div class="space-y-2">
          <Label for="status">Status</Label>
          <Select v-model="formData.status" id="status" required>
            <SelectTrigger>
              <SelectValue placeholder="Status auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Verfügbar">Verfügbar</SelectItem>
              <SelectItem value="Verwendet">Verwendet</SelectItem>
              <SelectItem value="Defekt">Defekt</SelectItem>
              <SelectItem value="In Reparatur">In Reparatur</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="space-y-2">
          <Label for="assignedTo">Zugewiesen an</Label>
          <Input id="assignedTo" v-model="formData.assignedTo" placeholder="Optional Person eingeben" />
        </div>
        <div class="space-y-2">
          <Label for="location">Ort</Label>
          <Input id="location" v-model="formData.location" placeholder="Optional Ort eingeben" />
        </div>

        <div class="space-y-2">
          <Label for="purchaseDate">Kaufdatum</Label>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline"
                :class="formData.purchaseDate ? 'w-[280px] justify-start text-left font-normal' : 'text-muted-foreground'">
                <Icon name="tabler:calendar" class="mr-2 h-4 w-4" />
                {{ formData.purchaseDate ? formData.purchaseDate : "Kaufdatum wählen" }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar :model-value="purchaseDateCalendar" calendar-label="Kaufdatum" initial-focus
                :min-value="new CalendarDate(1900, 1, 1)" :max-value="today(getLocalTimeZone())"
                @update:model-value="v => purchaseDateCalendar = v" />
            </PopoverContent>
          </Popover>
        </div>

        <div class="space-y-2">
          <Label for="value">Wert (CHF)</Label>
          <Input id="value" type="number" v-model.number="formData.value" required placeholder="Wert eingeben" />
        </div>
        <div class="space-y-2">
          <Label for="serialNumber">Seriennummer</Label>
          <Input id="serialNumber" v-model="formData.serialNumber" placeholder="Optional Seriennummer eingeben" />
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

  <!-- Edit Log Dialog -->
  <Dialog v-model:open="showEditModal">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Log bearbeiten</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="updateLog" class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input id="name" v-model="formData.name" required placeholder="Log Name eingeben" />
        </div>
        <div class="space-y-2">
          <Label for="category">Kategorie</Label>
          <Input id="category" v-model="formData.category" placeholder="Kategorie eingeben" />
        </div>
        <div class="space-y-2">
          <Label for="subcategory">Unterkategorie</Label>
          <Input id="subcategory" v-model="formData.subcategory" placeholder="Unterkategorie eingeben" />
        </div>
        <div class="space-y-2">
          <Label for="status">Status</Label>
          <Select v-model="formData.status" id="status" required>
            <SelectTrigger>
              <SelectValue placeholder="Status auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Verfügbar">Verfügbar</SelectItem>
              <SelectItem value="Verwendet">Verwendet</SelectItem>
              <SelectItem value="Defekt">Defekt</SelectItem>
              <SelectItem value="In Reparatur">In Reparatur</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="space-y-2">
          <Label for="assignedTo">Zugewiesen an</Label>
          <Input id="assignedTo" v-model="formData.assignedTo" placeholder="Optional Person eingeben" />
        </div>
        <div class="space-y-2">
          <Label for="location">Ort</Label>
          <Input id="location" v-model="formData.location" placeholder="Optional Ort eingeben" />
        </div>

        <div class="space-y-2">
          <Label for="purchaseDate">Kaufdatum</Label>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline"
                :class="formData.purchaseDate ? 'w-[280px] justify-start text-left font-normal' : 'text-muted-foreground'">
                <Icon name="tabler:calendar" class="mr-2 h-4 w-4" />
                {{ formData.purchaseDate ? formData.purchaseDate : "Kaufdatum wählen" }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar :model-value="purchaseDateCalendar" calendar-label="Kaufdatum" initial-focus
                :min-value="new CalendarDate(1900, 1, 1)" :max-value="today(getLocalTimeZone())"
                @update:model-value="v => purchaseDateCalendar = v" />
            </PopoverContent>
          </Popover>
        </div>

        <div class="space-y-2">
          <Label for="value">Wert (CHF)</Label>
          <Input id="value" type="number" v-model.number="formData.value" required placeholder="Wert eingeben" />
        </div>
        <div class="space-y-2">
          <Label for="serialNumber">Seriennummer</Label>
          <Input id="serialNumber" v-model="formData.serialNumber" placeholder="Optional Seriennummer eingeben" />
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
        <AlertDialogTitle>Log löschen</AlertDialogTitle>
        <p>Sind Sie sich sicher, dass Sie den Log <strong>{{ selectedLog.name }}</strong> löschen möchten?</p>
        <AlertDialogDescription>
          Diese Aktion kann nicht rückgängig gemacht werden.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="closeModals">Abbrechen</AlertDialogCancel>
        <AlertDialogAction @click="deleteLog" class="bg-destructive text-white hover:bg-destructive/90">
          Log löschen
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <!-- add log to stack dialog -->
  <!-- Delete Confirmation Dialog -->
  <Dialog v-model:open="showAddToStackModal">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Zu Stack hinzufügen</DialogTitle>
        <DialogDescription>

          <Combobox by="label" class="w-full">
            <ComboboxAnchor class="w-full">
              <ComboboxInput class="pl-2 w-full" :display-value="(val) => val?.label ?? ''"
                placeholder="Stacks wählen..." />
            </ComboboxAnchor>

            <ComboboxList>
              <ComboboxEmpty>
                Keine Stacks gefunden
              </ComboboxEmpty>

              <ComboboxGroup>
                <ComboboxItem v-for="(stack, index) in stacks" :key="`stack-option-${index}`" :value="stack.id">
                  {{ stack.title }}

                  <ComboboxItemIndicator>
                    <Icon name="tabler:check" />
                  </ComboboxItemIndicator>
                </ComboboxItem>
              </ComboboxGroup>
            </ComboboxList>
          </Combobox>

        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose @click="closeModals">
          <Button>Schliessen</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>