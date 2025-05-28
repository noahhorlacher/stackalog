<script setup>
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
    location: "Office Floor 2",
    purchaseDate: "2023-08-15",
    value: 2499,
    serialNumber: "MBP2023001",
    icon: 'tabler:device-laptop',
  },
  {
    id: "INV-002",
    name: "Herman Miller Aeron Chair",
    category: "Furniture",
    subcategory: "Office Chairs",
    status: "Verfügbar",
    assignedTo: "-",
    location: "Storage Room A",
    purchaseDate: "2023-06-20",
    value: 1395,
    serialNumber: "HM-AC-2023-002",
    icon: 'tabler:armchair',
  },
  {
    id: "INV-003",
    name: "Toyota Camry 2023",
    category: "Vehicles",
    subcategory: "Company Cars",
    status: "Verwendet",
    assignedTo: "Sarah Johnson",
    location: "Parking Garage B",
    purchaseDate: "2023-03-10",
    value: 28500,
    serialNumber: "TC2023-VIN-003",
    icon: 'tabler:car',
  },
  {
    id: "INV-004",
    name: "iPhone 15 Pro",
    category: "Elektronik",
    subcategory: "Mobile Devices",
    status: "Verwendet",
    assignedTo: "Mike Davis",
    location: "Office Floor 3",
    purchaseDate: "2023-09-22",
    value: 1199,
    serialNumber: "IP15P-2023-004",
    icon: 'tabler:phone',
  },
  {
    id: "INV-005",
    name: 'Dell UltraSharp 27" Monitor',
    category: "Elektronik",
    subcategory: "Monitors",
    status: "Verfügbar",
    assignedTo: "-",
    location: "IT Storage",
    purchaseDate: "2023-07-05",
    value: 549,
    serialNumber: "DU27-2023-005",
    icon: "tabler:user-screen",
  },
  {
    id: "INV-006",
    name: "HP LaserJet Pro Printer",
    category: "Elektronik",
    subcategory: "Printers",
    status: "In Reparatur",
    assignedTo: "-",
    location: "Office Floor 1",
    purchaseDate: "2023-04-18",
    value: 299,
    serialNumber: "HPLJ-2023-006",
    icon: "tabler:printer",
  },
  {
    id: "INV-007",
    name: "Standing Desk",
    category: "Furniture",
    subcategory: "Desks",
    status: "Verwendet",
    assignedTo: "Emily Chen",
    location: "Office Floor 2",
    purchaseDate: "2023-05-12",
    value: 799,
    serialNumber: "SD-2023-007",
    icon: "tabler:armchair",
  },
  {
    id: "INV-008",
    name: "Honda Civic 2023",
    category: "Vehicles",
    subcategory: "Company Cars",
    status: "Verfügbar",
    assignedTo: "-",
    location: "Parking Garage A",
    purchaseDate: "2023-02-28",
    value: 24900,
    serialNumber: "HC2023-VIN-008",
    icon: "tabler:car",
  },
  {
    id: "INV-009",
    name: "Industrial Paper Shredder",
    category: "Office Equipment",
    subcategory: "Document Management",
    status: "Verwendet",
    assignedTo: "HR Department",
    location: "Office Floor 1",
    purchaseDate: "2023-01-15",
    value: 450,
    serialNumber: "IPS-2023-009",
    icon: "tabler:printer",
  },
  {
    id: "INV-010",
    name: "Safety Hard Hats (Set of 20)",
    category: "Safety Equipment",
    subcategory: "Personal Protective Equipment",
    status: "Verfügbar",
    assignedTo: "-",
    location: "Safety Storage",
    purchaseDate: "2023-03-22",
    value: 300,
    serialNumber: "SHH-2023-010",
    icon: "tabler:armchair",
  },
  {
    id: "INV-011",
    name: "DeWalt Cordless Drill Set",
    category: "Tools & Equipment",
    subcategory: "Power Tools",
    status: "Verwendet",
    assignedTo: "In Reparatur Team",
    location: "Tool Storage",
    purchaseDate: "2023-04-10",
    value: 189,
    serialNumber: "DCD-2023-011",
    icon: "tabler:printer",
  },
  {
    id: "INV-012",
    name: "Commercial Coffee Machine",
    category: "Kitchen Equipment",
    subcategory: "Appliances",
    status: "Verwendet",
    assignedTo: "-",
    location: "Break Room Floor 2",
    purchaseDate: "2023-02-14",
    value: 1200,
    serialNumber: "CCM-2023-012",
    icon: "tabler:printer",
  },
  {
    id: "INV-013",
    name: "Cisco Network Switch 24-Port",
    category: "Networking Equipment",
    subcategory: "Network Infrastructure",
    status: "Verwendet",
    assignedTo: "IT Department",
    location: "Server Room",
    purchaseDate: "2023-06-08",
    value: 850,
    serialNumber: "CNS24-2023-013",
    icon: "tabler:user-screen",
  },
  {
    id: "INV-014",
    name: "Security Camera System",
    category: "Security Equipment",
    subcategory: "Surveillance",
    status: "Verwendet",
    assignedTo: "Security Team",
    location: "Building Perimeter",
    purchaseDate: "2023-01-30",
    value: 2100,
    serialNumber: "SCS-2023-014",
    icon: "tabler:user-screen",
  },
  {
    id: "INV-015",
    name: "First Aid Kit - Deluxe",
    category: "Medical Equipment",
    subcategory: "Emergency Supplies",
    status: "Verfügbar",
    assignedTo: "-",
    location: "Each Floor",
    purchaseDate: "2023-07-20",
    value: 85,
    serialNumber: "FAK-2023-015",
    icon: "tabler:armchair",
  },
  {
    id: "INV-016",
    name: "Adobe Creative Suite License",
    category: "Software",
    subcategory: "Design Software",
    status: "Verwendet",
    assignedTo: "Design Team",
    location: "Digital Asset",
    purchaseDate: "2023-09-01",
    value: 600,
    serialNumber: "ACS-2023-016",
    icon: "tabler:device-laptop",
  },
  {
    id: "INV-017",
    name: "Whiteboard - Mobile 6x4ft",
    category: "Office Supplies",
    subcategory: "Presentation Equipment",
    status: "Verfügbar",
    assignedTo: "-",
    location: "Conference Room A",
    purchaseDate: "2023-05-18",
    value: 320,
    serialNumber: "WBM-2023-017",
    icon: "tabler:user-screen",
  },
  {
    id: "INV-018",
    name: "Industrial Vacuum Cleaner",
    category: "Cleaning Equipment",
    subcategory: "In Reparatur Tools",
    status: "Verwendet",
    assignedTo: "Cleaning Staff",
    location: "Janitor Closet",
    purchaseDate: "2023-03-05",
    value: 280,
    serialNumber: "IVC-2023-018",
    icon: "tabler:printer",
  },
  {
    id: "INV-019",
    name: "Training Manuals (Set of 50)",
    category: "Books & Materials",
    subcategory: "Training Resources",
    status: "Verfügbar",
    assignedTo: "-",
    location: "Training Room",
    purchaseDate: "2023-08-10",
    value: 150,
    serialNumber: "TM-2023-019",
    icon: "tabler:armchair",
  },
  {
    id: "INV-020",
    name: "Projector - 4K Ultra HD",
    category: "Presentation Equipment",
    subcategory: "Audio Visual",
    status: "Verwendet",
    assignedTo: "Conference Room B",
    location: "Conference Room B",
    purchaseDate: "2023-04-25",
    value: 1800,
    serialNumber: "P4K-2023-020",
    icon: "tabler:user-screen",
  },
  {
    id: "INV-021",
    name: "Office Refrigerator",
    category: "Kitchen Equipment",
    subcategory: "Appliances",
    status: "Verwendet",
    assignedTo: "-",
    location: "Break Room Floor 1",
    purchaseDate: "2023-01-20",
    value: 650,
    serialNumber: "OR-2023-021",
    icon: "tabler:printer",
  },
  {
    id: "INV-022",
    name: "Fire Extinguisher - Class ABC",
    category: "Safety Equipment",
    subcategory: "Fire Safety",
    status: "Verfügbar",
    assignedTo: "-",
    location: "Each Floor",
    purchaseDate: "2023-06-15",
    value: 45,
    serialNumber: "FE-2023-022",
    icon: "tabler:armchair",
  },
  {
    id: "INV-023",
    name: "Microsoft Office 365 License",
    category: "Software",
    subcategory: "Productivity Software",
    status: "Verwendet",
    assignedTo: "All Employees",
    location: "Digital Asset",
    purchaseDate: "2023-01-01",
    value: 150,
    serialNumber: "O365-2023-023",
    icon: "tabler:device-laptop",
  },
  {
    id: "INV-024",
    name: "Forklift - Electric",
    category: "Vehicles",
    subcategory: "Industrial Vehicles",
    status: "In Reparatur",
    assignedTo: "Warehouse Team",
    location: "Warehouse",
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
        assignedTo: "-",
        location: "Unknown",
        purchaseDate: new Date().toISOString().split('T')[0],
        value: 0,
        serialNumber: `NEW-${newId}`,
        icon: null, // You may want to assign a default icon
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

	<!-- stats -->
	<div class="mb-8 grid grid-cols-4 gap-4">
		<Card>
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

		<Card>
			<CardContent>
				<div class="flex justify-between font-bold items-center mb-2">
					<p class="text-sm text-muted-foreground">Verfügbar</p>
					<Icon name="tabler:graph" class="text-emerald-400" size="25" />
				</div>
				<CardDescription>
					<p class="text-3xl font-bold text-emerald-400 mb-2">{{ logs.filter(l => l.status === "Verfügbar").length }}</p>
					<p class="text-xs">Bereit für den Einsatz</p>
				</CardDescription>
			</CardContent>
		</Card>

		<Card>
			<CardContent>
				<div class="flex justify-between font-bold items-center mb-2">
					<p class="text-sm text-muted-foreground">Verwendet</p>
					<Icon name="tabler:users" class="text-yellow-400" size="25" />
				</div>
				<CardDescription>
					<p class="text-3xl font-bold text-yellow-400 mb-2">{{ logs.filter(l => l.status === "Verwendet").length }}</p>
					<p class="text-xs">Momentan im Gebrauch</p>
				</CardDescription>
			</CardContent>
		</Card>

		<Card>
			<CardContent>
				<div class="flex justify-between font-bold items-center mb-2">
					<p class="text-sm text-muted-foreground">Totaler Wert</p>
					<Icon name="tabler:currency-frank" class="text-violet-400" size="25" />
				</div>
				<CardDescription>
					<p class="text-3xl font-bold text-violet-400 mb-2">Fr. {{ logs.reduce((a, log) => a + log.value, 0).toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</p>
					<p class="text-xs">Vermögensbewertung</p>
				</CardDescription>
			</CardContent>
		</Card>
	</div>

	<!-- search -->
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

		<Table class="max-h-[100px] overflow-scroll">
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Details</TableHead>
					<TableHead>Kategorie</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Zuweisung</TableHead>
					<TableHead>Ort</TableHead>
					<TableHead>Wert</TableHead>
					<TableHead class="text-right">Aktionen</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow v-for="(log, index) of filteredLogs" :key="`log-${index}`">
					<TableCell class="font-mono">{{log.id}}</TableCell>
					<TableCell class="py-4">
						<div class="flex items-center gap-3">
							<Button variant="outline" class="p-2">
								<Icon :name="log.icon" size="28" class="w-28 h-28"/>
							</Button>
							<div>
								<div class="font-semibold text-primary">{{log.name}}</div>
								<div class="text-sm text-muted-foreground">{{log.subcategory}}</div>
							</div>
						</div>
					</TableCell>
					<TableCell class="py-4 text-muted-foreground">{{log.category}}</TableCell>
					<TableCell class="py-4">
						<Badge :variant="log.status == 'Verfügbar' ? 'default' : 'outline'" class="border font-medium px-3 py-1">{{ log.status }}</Badge>
					</TableCell>
					<TableCell class="text-muted-foreground py-4">{{ log.assignedTo }}</TableCell>
					<TableCell class="text-muted-foreground py-4">{{ log.location }}</TableCell>
					<TableCell class="font-semibold py-4">Fr. {{ log.value.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</TableCell>
					<TableCell class="py-4 flex justify-end">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant="ghost" class="h-8 w-8 p-0">
									<Icon name="tabler:dots" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Aktionen</DropdownMenuLabel>
								<DropdownMenuItem @click="">
									<Icon name="tabler:eye" />Anzeigen
								</DropdownMenuItem>
								<DropdownMenuItem @click="">
									<Icon name="tabler:edit" />Bearbeiten
								</DropdownMenuItem>
								<DropdownMenuItem @click="" variant="destructive">
									<Icon name="tabler:trash" />Löschen
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
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