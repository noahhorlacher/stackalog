<script setup>
useSeoMeta({
  title: 'Stackalog — Benutzer'
})

// Reactive data
const searchQuery = ref('')
const showViewModal = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedUser = ref(null)

// Computed property for form modal
const showFormModal = computed({
	get: () => showAddModal.value || showEditModal.value,
	set: (value) => {
		if (!value) {
			showAddModal.value = false
			showEditModal.value = false
		}
	}
})

// Form data for add/edit
const formData = reactive({
	name: '',
	email: '',
	role: 'Viewer',
	status: 'Active'
})

// Mock user data
const users = ref([
	{
		id: 1,
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@example.com',
		isAdmin: true,
		status: 'Active',
		joinedAt: '2024-01-15'
	},
	{
		id: 2,
		firstName: 'Jane',
		lastName: 'Smith',
		email: 'jane.smith@example.com',
		isAdmin: false,
		status: 'Active',
		joinedAt: '2024-02-20'
	},
	{
		id: 3,
		firstName: 'Mike',
		lastName: 'Johnson',
		email: 'mike.johnson@example.com',
		isAdmin: false,
		status: 'Inactive',
		joinedAt: '2024-01-10'
	},
	{
		id: 4,
		firstName: 'Sarah',
		lastName: 'Wilson',
		email: 'sarah.wilson@example.com',
		isAdmin: true,
		status: 'Active',
		joinedAt: '2024-03-05'
	},
	{
		id: 5,
		firstName: 'David',
		lastName: 'Brown',
		email: 'david.brown@example.com',
		isAdmin: false,
		status: 'Active',
		joinedAt: '2024-02-28'
	},
	{
		id: 6,
		firstName: 'Lisa',
		lastName: 'Davis',
		email: 'lisa.davis@example.com',
		isAdmin: false,
		status: 'Active',
		joinedAt: '2024-03-12'
	}
])

// Computed properties
const filteredUsers = computed(() => {
	if (!searchQuery.value || searchQuery.value.length === 0) return users.value

	const query = searchQuery.value.toLowerCase()
	return users.value.filter(user =>
		user.firstName.toLowerCase().includes(query) ||
		user.lastName.toLowerCase().includes(query) ||
		user.email.toLowerCase().includes(query)
	)
})

const getRoleVariant = isAdmin => isAdmin ? 'default' : 'outline'
const getRoleIcon = isAdmin => isAdmin ? 'tabler:shield-check' : 'tabler:user'

const formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString('de-CH', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})
}

const openAddModal = () => {
	resetForm()
	showAddModal.value = true
}

const viewUser = (user) => {
	selectedUser.value = user
	showViewModal.value = true
}

const editUser = (user) => {
	selectedUser.value = user
	formData.firstName = user.firstName
	formData.lastName = user.lastName
	formData.email = user.email
	formData.isAdmin = user.isAdmin
	formData.status = user.status
	showEditModal.value = true
}

const deleteUser = (user) => {
	selectedUser.value = user
	showDeleteModal.value = true
}

const saveUser = () => {
	if (showAddModal.value) {
		// Add new user
		const newUser = {
			id: Math.max(...users.value.map(u => u.id)) + 1,
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			isAdmin: formData.isAdmin,
			status: formData.status,
			joinedAt: new Date().toISOString().split('T')[0]
		}
		users.value.push(newUser)
	} else if (showEditModal.value) {
		// Edit existing user
		const index = users.value.findIndex(u => u.id === selectedUser.value.id)
		if (index !== -1) {
			users.value[index] = {
				...users.value[index],
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				isAdmin: formData.isAdmin,
				status: formData.status
			}
		}
	}
	closeModals()
}

const confirmDelete = () => {
	const index = users.value.findIndex(u => u.id === selectedUser.value.id)
	if (index !== -1) {
		users.value.splice(index, 1)
	}
	closeModals()
}

const closeModals = () => {
	showViewModal.value = false
	showAddModal.value = false
	showEditModal.value = false
	showDeleteModal.value = false
	selectedUser.value = null
	resetForm()
}

const resetForm = () => {
	formData.firstName = ''
	formData.lastName = ''
	formData.email = ''
	formData.isAdmin = false
	formData.status = 'Active'
}
</script>

<template>
	<!-- Header -->
	<div class="space-y-2 mb-6">
		<h1 class="text-3xl font-bold">Benutzerverwaltung</h1>
		<p class="text-muted-foreground">Verwalten Sie Benutzer und ihre Berechtigungen</p>
	</div>

	<!-- Search and Add User Section -->
	<div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-12">
		<div class="relative flex-1 max-w-md">
			<Icon name="tabler:search"
				class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
			<Input v-model="searchQuery" placeholder="Benutzer mit Name oder Email durchsuchen..." class="pl-10" />
		</div>
		<Button @click="openAddModal" class="flex items-center gap-2">
			<Icon name="tabler:plus" />
			Benutzer hinzufügen
		</Button>
	</div>

	<!-- Users Table -->
	<!-- Empty State -->
	<div v-if="filteredUsers.length === 0" class="text-center py-12">
		<Icon name="tabler:users" class="mx-auto text-muted-foreground" />
		<h3 class="mt-2 text-sm font-medium">No users found</h3>
		<p class="mt-1 text-sm text-muted-foreground">
			{{ searchQuery ? 'Passen Sie Ihre Suche an' : 'Fügen Sie Ihren ersten Benutzer hinzu' }}
		</p>
	</div>

	<div v-else class="max-h-[800px] w-full overflow-y-scroll">
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Benutzer</TableHead>
					<TableHead>Rolle</TableHead>
					<TableHead>Status</TableHead>
					<TableHead class="text-right pr-6">Aktionen</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow v-for="(user, index) in filteredUsers" :key="`user-row-${index}`">
					<TableCell class="py-3">
						<div class="flex items-center gap-3">
							<Avatar>
								<AvatarFallback>{{ user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase() }}
								</AvatarFallback>
							</Avatar>
							<div>
								<div class="font-medium">{{ user.firstName + ' ' + user.lastName }}</div>
								<div class="text-sm text-muted-foreground">{{ user.email }}</div>
							</div>
						</div>
					</TableCell>
					<TableCell>
						<Badge :variant="getRoleVariant(user.isAdmin)">
							<Icon :name="getRoleIcon(user.isAdmin)" />
							{{ user.isAdmin ? 'Administrator' : 'Benutzer' }}
						</Badge>
					</TableCell>
					<TableCell>
						<Badge :variant="user.status === 'Active' ? 'default' : 'secondary'">
							{{ user.status === 'Active' ? 'Aktiv' : 'Inaktiv' }}
						</Badge>
					</TableCell>
					<TableCell class="text-right">
						<div class="flex justify-end">
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Button variant="ghost" class="h-8 w-8 p-0 mr-3">
										<Icon name="tabler:dots" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Aktionen</DropdownMenuLabel>
									<DropdownMenuItem @click="viewUser(user)">
										<Icon name="tabler:eye" />Benutzer anzeigen
									</DropdownMenuItem>
									<DropdownMenuItem @click="editUser(user)">
										<Icon name="tabler:edit" />Benutzer bearbeiten
									</DropdownMenuItem>
									<DropdownMenuItem @click="deleteUser(user)" variant="destructive">
										<Icon name="tabler:trash" />Benutzer löschen
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</div>

	<!-- View User Dialog -->
	<Dialog v-model:open="showViewModal">
		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Benutzerdetails</DialogTitle>
			</DialogHeader>

			<div v-if="selectedUser" class="space-y-6">
				<div class="text-center mb-4">
					<Avatar class="h-16 w-16 mx-auto mb-4">
						<AvatarFallback class="text-xl">
							{{ selectedUser.firstName.charAt(0).toUpperCase() + selectedUser.lastName.charAt(0).toUpperCase() }}
						</AvatarFallback>
					</Avatar>
					<h4 class="text-lg font-medium">{{ selectedUser.firstName + ' ' + selectedUser.lastName }}</h4>
					<span class="text-muted-foreground">{{ selectedUser.email }}</span>
				</div>
				<div class="flex justify-center gap-3">
					<Badge :variant="getRoleVariant(selectedUser.isAdmin)">
						<Icon :name="getRoleIcon(selectedUser.isAdmin)" />
						{{ selectedUser.isAdmin ? 'Administrator' : 'Benutzer' }}
					</Badge>
					<Badge :variant="selectedUser.status === 'Active' ? 'default' : 'secondary'">
						{{ selectedUser.status === 'Active' ? 'Aktiv' : 'Inaktiv' }}
					</Badge>
				</div>
				<div class="flex justify-center mt-8">
					<span class="text-muted-foreground text-sm">Erstellt: {{ formatDate(selectedUser.joinedAt) }}</span>
				</div>
			</div>
		</DialogContent>
	</Dialog>

	<!-- Add/Edit User Dialog -->
	<Dialog v-model:open="showFormModal">
		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>{{ showAddModal ? 'Benutzer hinzufügen' : 'Benutzer bearbeiten' }}</DialogTitle>
			</DialogHeader>
			<form @submit.prevent="saveUser" class="space-y-4">
				<div class="space-y-2">
					<Label for="firstName">Vorname</Label>
					<Input id="firstName" v-model="formData.firstName" required placeholder="Vor- und Mittelnamen eingeben" />
				</div>
				<div class="space-y-2">
					<Label for="lastName">Nachname</Label>
					<Input id="lastName" v-model="formData.lastName" required placeholder="Nachname eingeben" />
				</div>
				<div class="space-y-2">
					<Label for="email">Email Adresse</Label>
					<Input id="email" v-model="formData.email" type="email" required placeholder="Email Adresse eingeben" />
				</div>
				<div class="space-y-2">
					<Label for="role">Administratorberechtigungen</Label>
					<Checkbox v-model="formData.isAdmin" />
				</div>
				<div class="space-y-2">
					<Label for="status">Status</Label>
					<Select v-model="formData.status">
						<SelectTrigger>
							<SelectValue placeholder="Select status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Active">Aktiv</SelectItem>
							<SelectItem value="Inactive">Inaktiv</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<DialogFooter class="gap-2">
					<Button type="button" variant="outline" @click="closeModals">
						Abbrechen
					</Button>
					<Button type="submit">
						{{ showAddModal ? 'Benutzer hinzufügen' : 'Änderungen speichern' }}
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>

	<!-- Delete Confirmation Dialog -->
	<AlertDialog v-model:open="showDeleteModal">
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Benutzer löschen</AlertDialogTitle>
				<p>Sind Sie sich sicher, dass Sie <strong>{{ selectedUser?.firstName + ' ' + selectedUser?.lastName }}</strong>
					löschen möchten?</p>
				<AlertDialogDescription>
					Diese Aktion kann nicht rückgängig gemacht werden.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel @click="closeModals">Abbrechen</AlertDialogCancel>
				<AlertDialogAction @click="confirmDelete" class="bg-destructive text-white hover:bg-destructive/90">
					Benutzer löschen
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>