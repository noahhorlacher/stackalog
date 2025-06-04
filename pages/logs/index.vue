<script setup>
import { toast } from 'vue-sonner'
import { parseDate, CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

useSeoMeta({
  title: 'Stackalog — Logs'
})

const logSearchQuery = ref('')
const showAddModal = ref(false)

const logs = ref([])

const { data: logsData, error: logsError } = await useFetch('/api/logs/')
if(logsError.value){
  toast('Fehler', {
    description: 'Fehler beim Laden der Logs. Kontaktieren Sie den Support.'
  })
} else {
  logs.value = logsData.value.reverse()
}
  
// Form data for add/edit
const formData = reactive({
  name: '',
  category: 'Unkategorisiert',
  subcategory: '',
  status: 'Verfügbar',
  assignedTo: '—',
  location: 'Unbekannt',
  purchaseDate: parseDate(new Date().toISOString().split('T')[0]),
  value: 0,
  serialNumber: ''
})

const dateFormatter = new DateFormatter('de-CH', { dateStyle: 'medium' })

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
  formData.purchaseDate = parseDate(new Date().toISOString().split('T')[0])
  formData.value = 0
  formData.serialNumber = ''
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
  $fetch('/api/logs/', {
    method: 'POST',
    body: {
      ...formData,
      purchaseDate: formData.purchaseDate.toDate(getLocalTimeZone())
    }
  }).then(response => {
    const newLog = { ...formData, id: response.id }

    logs.value.unshift(newLog)
    
    toast('Erfolg', {
      description: 'Log erfolgreich hinzugefügt'
    })
  }).catch(err => {
    toast('Error', {
      description: err.message
    })
  }).finally(closeModals)
}

const deleteLog = (log) => {
	$fetch('/api/logs/' + log.id, {
		method: 'DELETE'
	}).then(() => {
		toast('Erfolg', {
			description: 'Log erfolgreich gelöscht'
		})

		const index = logs.value.findIndex(l => l.id === log.id)
		logs.value.splice(index, 1)
	}).catch(err => {
		toast('Fehler', {
			description: err.message || 'Beim Löschen des Logs ist ein Fehler aufgetreten'
		})
	}).finally(() => {
		closeModals()
	})
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
    <Card class="hover:shadow-md shadow-blue-600 hover:-translate-y-[3px] transition-all">
      <CardContent>
        <div class="flex justify-between font-bold items-center mb-2">
          <p class="text-sm text-muted-foreground">Total</p>
          <Icon name="tabler:logs" class="text-blue-400" size="25" />
        </div>
        <CardDescription>
          <p class="text-3xl font-bold text-blue-400 mb-2">{{ logs.length }}</p>
          <p class="text-xs">In allen Kategorien</p>
        </CardDescription>
      </CardContent>
    </Card>

    <Card class="hover:shadow-md shadow-emerald-600 hover:-translate-y-[3px] transition-all">
      <CardContent>
        <div class="flex justify-between font-bold items-center mb-2">
          <p class="text-sm text-muted-foreground">Verfügbar</p>
          <Icon name="tabler:graph" class="text-emerald-400" size="25" />
        </div>
        <CardDescription>
          <p class="text-3xl font-bold text-emerald-400 mb-2">{{logs.filter(l => l.status === "Verfügbar").length}}
          </p>
          <p class="text-xs">Bereit für den Einsatz</p>
        </CardDescription>
      </CardContent>
    </Card>

    <Card class="hover:shadow-md shadow-yellow-600 hover:-translate-y-[3px] transition-all">
      <CardContent>
        <div class="flex justify-between font-bold items-center mb-2">
          <p class="text-sm text-muted-foreground">Defekt</p>
          <Icon name="tabler:users" class="text-yellow-400" size="25" />
        </div>
        <CardDescription>
          <p class="text-3xl font-bold text-yellow-400 mb-2">{{logs.filter(l => ["Defekt", "In Reparatur"].includes(l.status)).length}}</p>
          <p class="text-xs">Defekt oder in Reparatur</p>
        </CardDescription>
      </CardContent>
    </Card>

    <Card class="hover:shadow-md shadow-violet-600 hover:-translate-y-[3px] transition-all">
      <CardContent>
        <div class="flex justify-between font-bold items-center mb-2">
          <p class="text-sm text-muted-foreground">Totaler Wert</p>
          <Icon name="tabler:currency-frank" class="text-violet-400" size="25" />
        </div>
        <CardDescription>
          <p class="text-3xl font-bold text-violet-400 mb-2">Fr. {{logs.reduce((a, log) => a + (log.value || 0),
            0).toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</p>
          <p class="text-xs">Vermögensbewertung</p>
        </CardDescription>
      </CardContent>
    </Card>
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
        <Button @click="openAddModal" class="flex items-center">
          <Icon name="tabler:plus" />
          Log hinzufügen
        </Button>
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
          <LogCard :log v-for="(log, index) in paginatedLogs" :key="`log-${index}`" @deleteLog="deleteLog" />
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
              <Button
                variant="outline"
                :class="formData.purchaseDate ? 'w-[280px] justify-start text-left font-normal': 'text-muted-foreground'"
              >
                <Icon name="tabler:calendar" class="mr-2 h-4 w-4" />
                {{ formData.purchaseDate ? dateFormatter.format(formData.purchaseDate.toDate(getLocalTimeZone())) : "Kaufdatum wählen" }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar
                :model-value="formData.purchaseDate"
                calendar-label="Kaufdatum"
                initial-focus
                :min-value="parseDate('1900-01-01')"
                :max-value="parseDate(new Date().toISOString().split('T')[0])"
                @update:model-value="v => formData.purchaseDate = v"
                />
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
</template>