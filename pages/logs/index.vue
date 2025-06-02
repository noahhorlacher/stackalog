<script setup>
useSeoMeta({
  title: 'Stackalog — Logs'
})

const logSearchQuery = ref('')
const showAddModal = ref(false)

const logs = ref([
  {
    id: "INV-001",
    name: 'MacBook Pro 16"',
    category: "Elektronik",
    subcategory: "Laptops",
    status: "Verwendet",
    assignedTo: "John Smith",
    location: "Büroetage 2",
    purchaseDate: "2023-08-15",
    value: 2499,
    serialNumber: "MBP2023001",
    icon: 'tabler:device-laptop',
  },
  {
    id: "INV-002",
    name: "Herman Miller Aeron Stuhl",
    category: "Möbel",
    subcategory: "Bürostühle",
    status: "Verfügbar",
    assignedTo: "—",
    location: "Lagerraum A",
    purchaseDate: "2023-06-20",
    value: 1395,
    serialNumber: "HM-AC-2023-002",
    icon: 'tabler:armchair',
  },
  {
    id: "INV-003",
    name: "Toyota Camry 2023",
    category: "Fortbewegungsmittel",
    subcategory: "Firmenfahrzeuge",
    status: "Verwendet",
    assignedTo: "Sarah Johnson",
    location: "Parkgarage B",
    purchaseDate: "2023-03-10",
    value: 28500,
    serialNumber: "TC2023-VIN-003",
    icon: 'tabler:car',
  },
  {
    id: "INV-004",
    name: "iPhone 15 Pro",
    category: "Elektronik",
    subcategory: "Mobilgeräte",
    status: "Verwendet",
    assignedTo: "Mike Davis",
    location: "Büroetage 3",
    purchaseDate: "2023-09-22",
    value: 1199,
    serialNumber: "IP15P-2023-004",
    icon: 'tabler:phone',
  },
  {
    id: "INV-005",
    name: 'Dell UltraSharp 27" Monitor',
    category: "Elektronik",
    subcategory: "Monitore",
    status: "Verfügbar",
    assignedTo: "—",
    location: "IT-Lager",
    purchaseDate: "2023-07-05",
    value: 549,
    serialNumber: "DU27-2023-005",
    icon: "tabler:user-screen",
  },
  {
    id: "INV-006",
    name: "HP LaserJet Pro Drucker",
    category: "Elektronik",
    subcategory: "Drucker",
    status: "In Reparatur",
    assignedTo: "—",
    location: "Büroetage 1",
    purchaseDate: "2023-04-18",
    value: 299,
    serialNumber: "HPLJ-2023-006",
    icon: "tabler:printer",
  },
  {
    id: "INV-007",
    name: "Stehschreibtisch",
    category: "Möbel",
    subcategory: "Schreibtische",
    status: "Verwendet",
    assignedTo: "Emily Chen",
    location: "Büroetage 2",
    purchaseDate: "2023-05-12",
    value: 799,
    serialNumber: "SD-2023-007",
    icon: "tabler:armchair",
  },
  {
    id: "INV-008",
    name: "Honda Civic 2023",
    category: "Fortbewegungsmittel",
    subcategory: "Firmenfahrzeuge",
    status: "Verfügbar",
    assignedTo: "—",
    location: "Parkgarage A",
    purchaseDate: "2023-02-28",
    value: 24900,
    serialNumber: "HC2023-VIN-008",
    icon: "tabler:car",
  },
  {
    id: "INV-009",
    name: "Industrieller Aktenvernichter",
    category: "Büroausstattung",
    subcategory: "Dokumentenmanagement",
    status: "Verwendet",
    assignedTo: "Personalabteilung",
    location: "Büroetage 1",
    purchaseDate: "2023-01-15",
    value: 450,
    serialNumber: "IPS-2023-009",
    icon: "tabler:printer",
  },
  {
    id: "INV-010",
    name: "Sicherheitshelme (Satz à 20)",
    category: "Sicherheitsequipment",
    subcategory: "Persönliche Schutzausrüstung",
    status: "Verfügbar",
    assignedTo: "—",
    location: "Sicherheitslager",
    purchaseDate: "2023-03-22",
    value: 300,
    serialNumber: "SHH-2023-010",
    icon: "tabler:armchair",
  },
  {
    id: "INV-011",
    name: "DeWalt Akku-Bohrmaschinenset",
    category: "Werkzeuge & Geräte",
    subcategory: "Elektrowerkzeuge",
    status: "Verwendet",
    assignedTo: "Reparaturteam",
    location: "Werkzeuglager",
    purchaseDate: "2023-04-10",
    value: 189,
    serialNumber: "DCD-2023-011",
    icon: "tabler:printer",
  },
  {
    id: "INV-012",
    name: "Gewerbliche Kaffeemaschine",
    category: "Küchenausstattung",
    subcategory: "Geräte",
    status: "Verwendet",
    assignedTo: "—",
    location: "Aufenthaltsraum Etage 2",
    purchaseDate: "2023-02-14",
    value: 1200,
    serialNumber: "CCM-2023-012",
    icon: "tabler:printer",
  },
  {
    id: "INV-013",
    name: "Cisco Netzwerk-Switch 24-Port",
    category: "Netzwerktechnik",
    subcategory: "Netzwerkinfrastruktur",
    status: "Verwendet",
    assignedTo: "IT-Abteilung",
    location: "Serverraum",
    purchaseDate: "2023-06-08",
    value: 850,
    serialNumber: "CNS24-2023-013",
    icon: "tabler:user-screen",
  },
  {
    id: "INV-014",
    name: "Überwachungskamerasystem",
    category: "Sicherheitsequipment",
    subcategory: "Überwachung",
    status: "Verwendet",
    assignedTo: "Sicherheitsteam",
    location: "Gebäudeumgebung",
    purchaseDate: "2023-01-30",
    value: 2100,
    serialNumber: "SCS-2023-014",
    icon: "tabler:user-screen",
  },
  {
    id: "INV-015",
    name: "Erste-Hilfe-Kasten – Deluxe",
    category: "Medizintechnik",
    subcategory: "Notfallausrüstung",
    status: "Verfügbar",
    assignedTo: "—",
    location: "Jede Etage",
    purchaseDate: "2023-07-20",
    value: 85,
    serialNumber: "FAK-2023-015",
    icon: "tabler:armchair",
  },
  {
    id: "INV-016",
    name: "Adobe Creative Suite Lizenz",
    category: "Software",
    subcategory: "Designsoftware",
    status: "Verwendet",
    assignedTo: "Designteam",
    location: "Digitale Ressource",
    purchaseDate: "2023-09-01",
    value: 600,
    serialNumber: "ACS-2023-016",
    icon: "tabler:device-laptop",
  },
  {
    id: "INV-017",
    name: "Whiteboard – Mobil 6x4ft",
    category: "Bürobedarf",
    subcategory: "Präsentationsausstattung",
    status: "Verfügbar",
    assignedTo: "—",
    location: "Konferenzraum A",
    purchaseDate: "2023-05-18",
    value: 320,
    serialNumber: "WBM-2023-017",
    icon: "tabler:user-screen",
  },
  {
    id: "INV-018",
    name: "Industrieller Staubsauger",
    category: "Reinigungsgeräte",
    subcategory: "Reparaturwerkzeuge",
    status: "Verwendet",
    assignedTo: "Reinigungspersonal",
    location: "Putzschrank",
    purchaseDate: "2023-03-05",
    value: 280,
    serialNumber: "IVC-2023-018",
    icon: "tabler:printer",
  },
  {
    id: "INV-019",
    name: "Schulungsunterlagen (Satz à 50)",
    category: "Bücher & Materialien",
    subcategory: "Schulungsressourcen",
    status: "Verfügbar",
    assignedTo: "—",
    location: "Schulungsraum",
    purchaseDate: "2023-08-10",
    value: 150,
    serialNumber: "TM-2023-019",
    icon: "tabler:armchair",
  },
  {
    id: "INV-020",
    name: "Projektor – 4K Ultra HD",
    category: "Präsentationsausstattung",
    subcategory: "Audio-Visuell",
    status: "Verwendet",
    assignedTo: "Konferenzraum B",
    location: "Konferenzraum B",
    purchaseDate: "2023-04-25",
    value: 1800,
    serialNumber: "P4K-2023-020",
    icon: "tabler:user-screen",
  },
  {
    id: "INV-021",
    name: "Bürokühlschrank",
    category: "Küchenausstattung",
    subcategory: "Geräte",
    status: "Verwendet",
    assignedTo: "—",
    location: "Aufenthaltsraum Etage 1",
    purchaseDate: "2023-01-20",
    value: 650,
    serialNumber: "OR-2023-021",
    icon: "tabler:printer",
  },
  {
    id: "INV-022",
    name: "Feuerlöscher – Klasse ABC",
    category: "Sicherheitsequipment",
    subcategory: "Brandschutz",
    status: "Verfügbar",
    assignedTo: "—",
    location: "Jede Etage",
    purchaseDate: "2023-06-15",
    value: 45,
    serialNumber: "FE-2023-022",
    icon: "tabler:armchair",
  },
  {
    id: "INV-023",
    name: "Microsoft Office 365 Lizenz",
    category: "Software",
    subcategory: "Produktivitätssoftware",
    status: "Verwendet",
    assignedTo: "Alle Mitarbeiter",
    location: "Digitale Ressource",
    purchaseDate: "2023-01-01",
    value: 150,
    serialNumber: "O365-2023-023",
    icon: "tabler:device-laptop",
  },
  {
    id: "INV-024",
    name: "Gabelstapler – Elektrisch",
    category: "Fortbewegungsmittel",
    subcategory: "Industrielle Fortbewegungsmittel",
    status: "In Reparatur",
    assignedTo: "Lagerteam",
    location: "Lagerhalle",
    purchaseDate: "2022-11-10",
    value: 15500,
    serialNumber: "FE-2022-024",
    icon: "tabler:car",
  },
])

// Form data for add/edit
const formData = reactive({
  title: ''
})

const filteredLogs = computed(() => {
  if (!logSearchQuery.value.trim()) return logs.value

  const query = logSearchQuery.value.toLowerCase()
  return logs.value.filter(log =>
    log.name.toLowerCase().includes(query)
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
  const maxId = Math.max(
    ...logs.value.map(log => parseInt(log.id.replace('INV-', ''), 10))
  )
  const newId = `INV-${String(maxId + 1).padStart(3, '0')}`

  const newLog = {
    id: newId,
    name: formData.title,
    category: "Uncategorized",
    subcategory: "",
    status: "Verfügbar",
    assignedTo: "—",
    location: "Unknown",
    purchaseDate: new Date().toISOString().split('T')[0],
    value: 0,
    serialNumber: `NEW-${newId}`,
    icon: null, // You may want to assign a default icon
  }

  logs.value.push(newLog)
  closeModals()
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
          <p class="text-sm text-muted-foreground">Verwendet</p>
          <Icon name="tabler:users" class="text-yellow-400" size="25" />
        </div>
        <CardDescription>
          <p class="text-3xl font-bold text-yellow-400 mb-2">{{logs.filter(l => l.status === "Verwendet").length}}</p>
          <p class="text-xs">Momentan im Gebrauch</p>
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
          <p class="text-3xl font-bold text-violet-400 mb-2">Fr. {{logs.reduce((a, log) => a + log.value,
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
    <div v-if="filteredLogs.length === 0" class="text-center py-12 mx-auto">
      <Icon name="tabler:logs" class="mx-auto text-muted-foreground" />
      <h3 class="mt-2 text-sm font-medium">Keine Logs gefunden</h3>
      <p class="mt-1 text-sm text-muted-foreground">
        {{ logSearchQuery ? 'Passen Sie Ihre Suche an' : 'Fügen Sie Ihren ersten Log hinzu' }}
      </p>
    </div>
    <div v-else class="max-h-[700px] w-full overflow-y-scroll">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Zuweisung</TableHead>
            <TableHead>Ort</TableHead>
            <TableHead>Wert</TableHead>
            <TableHead class="text-right pr-6">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(log, index) of paginatedLogs" :key="`log-${index}`">
            <TableCell class="font-mono">{{ log.id }}</TableCell>
            <TableCell>
              <div class="flex items-center gap-3">
                <div class="bg-muted p-2 rounded-md">
                  <div class="h-7 w-7">
                    <Icon :name="log.icon" size="28" />
                  </div>
                </div>
                <div>
                  <div class="font-semibold text-primary">{{ log.name }}</div>
                  <div class="text-sm text-muted-foreground">{{ log.subcategory }}</div>
                </div>
              </div>
            </TableCell>
            <TableCell class="py-6">
              <Badge :variant="log.status == 'Verfügbar' ? 'default' : 'outline'" class="border font-medium px-3 py-1">
                {{ log.status }}</Badge>
            </TableCell>
            <TableCell class="text-muted-foreground">{{ log.assignedTo }}</TableCell>
            <TableCell class="text-muted-foreground">{{ log.location }}</TableCell>
            <TableCell class="font-semibold">Fr. {{ log.value.toLocaleString('de-CH', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) }}</TableCell>
            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" class="h-8 w-8 p-0 mr-3">
                    <Icon name="tabler:dots" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                  <DropdownMenuItem @click="">
                    <Icon name="tabler:eye" />Log anzeigen
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="">
                    <Icon name="tabler:edit" />Log bearbeiten
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="" variant="destructive">
                    <Icon name="tabler:trash" />Log löschen
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- pagination -->
      <div class="w-full flex mt-4 gap-2 justify-end items-center">
        <Button variant="outline" size="sm" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
          <Icon name="tabler:chevron-left" />
        </Button>

        <div class="text-sm text-muted-foreground">
          Seite {{ currentPage }} von {{ totalPages }}
        </div>

        <Button variant="outline" size="sm" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
          <Icon name="tabler:chevron-right" />
        </Button>
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
          <Label for="firstName">Titel</Label>
          <Input id="firstName" v-model="formData.title" required placeholder="Log Titel eingeben" />
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