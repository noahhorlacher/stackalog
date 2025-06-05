<script setup>
import { toast } from 'vue-sonner'

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

// Form data for add/edit
const formData = reactive({
	firstName: '',
	lastName: '',
	isAdmin: false,
	email: '',
})

const users = ref([])

const { data: usersData, error: usersError } = await useFetch('/api/users/')
if (usersError.value) {
	toast('Fehler', {
		description: 'Fehler beim Laden der Stacks. Kontaktieren Sie den Support.'
	})
} else {
	users.value = usersData.value.reverse()
}

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

const openAddModal = () => {
	resetForm()
	generateSafePassword()
	showAddModal.value = true
}

const openEditModal = user => {
	selectedUser.value = user
	formData.firstName = user.firstName
	formData.lastName = user.lastName
	formData.email = user.email
	formData.isAdmin = user.isAdmin
	formData.status = user.status
	showEditModal.value = true
}

const openDeleteModal = user => {
	selectedUser.value = user
	showDeleteModal.value = true
}

const saveUser = () => {
	$fetch('/api/users/', {
		method: 'POST',
		body: { ...formData, password: safePassword.value }
	}).then(response => {
		toast('Erfolg', {
			description: 'Benutzer erfolgreich hinzugefügt'
		})

		const newLog = { ...formData, id: response.id }

		users.value.unshift(newLog)
	}).catch(err => {
		toast('Fehler', {
			description: err.message || 'Beim Hinzufügen des Benutzers ist ein Fehler aufgetreten'
		})
	}).finally(closeModals)
}

const updateUser = () => {
	$fetch('/api/users/' + selectedUser.value.id, {
		method: 'PUT',
		body: { ...formData }
	}).then(() => {
		toast('Erfolg', {
			description: 'Benutzer erfolgreich aktualisiert'
		})

		const index = users.value.findIndex(s => s.id === selectedUser.value.id)
		if (index !== -1) {
			users.value[index] = { ...users.value[index], ...formData }
		}
	}).catch(err => {
		toast('Fehler', {
			description: err.message || 'Beim Aktualisieren des Benutzers ist ein Fehler aufgetreten'
		})
	}).finally(closeModals)
}

const deleteUser = () => {
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
	safePassword.value = ''
}

const currentPage = ref(1)
const itemsPerPage = ref(10)

const paginatedUsers = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value
	const end = start + itemsPerPage.value
	return filteredUsers.value.slice(start, end)
})

const totalPages = computed(() =>
	Math.ceil(filteredUsers.value.length / itemsPerPage.value)
)

const goToPage = (page) => {
	currentPage.value = page
}

watch(searchQuery, () => {
	currentPage.value = 1
})

const safePassword = ref('')
function generateSafePassword(length = 12) {
	const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?'
	let password = ''
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length)
		password += charset[randomIndex]
	}
	safePassword.value = password
}

function copyPassword() {
	navigator.clipboard.writeText(safePassword.value).then(() => {
		toast('Erfolg', {
			description: 'Passwort in die Zwischenablage kopiert'
		})
	}).catch(err => {
		toast('Fehler', {
			description: 'Fehler beim Kopieren des Passworts: ' + err.message
		})
	})
}
</script>

<template>
	<!-- header -->
	<div class="space-y-2 mb-6">
		<h1 class="text-3xl font-bold">Benutzerverwaltung</h1>
		<p class="text-muted-foreground">Verwalten Sie Benutzer und ihre Berechtigungen</p>
	</div>

	<!-- search and add user section -->
	<Card class="mb-12">
		<CardContent>
			<div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
				<div class="relative flex-1 max-w-md">
					<Icon name="tabler:search"
						class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
					<Input v-model="searchQuery" placeholder="Benutzer mit Name oder Email durchsuchen..."
						class="pl-10" />
				</div>
				<Button @click="openAddModal" class="flex items-center">
					<Icon name="tabler:plus" />
					Benutzer hinzufügen
				</Button>
			</div>
		</CardContent>
	</Card>

	<!-- empty state -->
	<div v-if="filteredUsers.length === 0" class="text-center py-12">
		<Icon name="tabler:users" class="mx-auto text-muted-foreground" />
		<h3 class="mt-2 text-sm font-medium">No users found</h3>
		<p class="mt-1 text-sm text-muted-foreground">
			{{ searchQuery ? 'Passen Sie Ihre Suche an' : 'Fügen Sie Ihren ersten Benutzer hinzu' }}
		</p>
	</div>

	<!-- users -->
	<ScrollArea v-else class="h-[600px]">
		<div class="flex flex-wrap gap-8 justify-center items-start">
			<UserCard v-for="(user, index) in paginatedUsers" :key="`user-row-${index}`" :user
				@editUser="openEditModal" @deleteUser="openDeleteModal" />
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

	<!-- Add User Dialog -->
	<Dialog v-model:open="showAddModal">
		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Benutzer hinzufügen</DialogTitle>
			</DialogHeader>
			<form @submit.prevent="saveUser" class="space-y-4">
				<div class="space-y-2">
					<Label for="firstName">Vorname</Label>
					<Input id="firstName" v-model="formData.firstName" required
						placeholder="Vor- und Mittelnamen eingeben" />
				</div>
				<div class="space-y-2">
					<Label for="lastName">Nachname</Label>
					<Input id="lastName" v-model="formData.lastName" required placeholder="Nachname eingeben" />
				</div>
				<div class="space-y-2">
					<Label for="email">Email Adresse</Label>
					<Input id="email" v-model="formData.email" type="email" required
						placeholder="Email Adresse eingeben" />
				</div>
				<div class="gap-x-2 flex items-center">
					<Checkbox v-model="formData.isAdmin" />
					<Label for="role">Administratorberechtigungen</Label>
				</div>
				<div class="space-y-2">
					<Label for="password">Passwort</Label>
					<div class="relative flex items-center">
						<Icon name="tabler:key" class="absolute left-3 text-muted-foreground h-4 w-4" />
						<Input
							id="password"
							v-model="safePassword"
							readonly
							required
							placeholder="Passwort"
							class="pl-10 pr-12"
						/>
						<Button
							type="button"
							variant="ghost"
							class="absolute right-0"
							@click="copyPassword"
							tabindex="-1"
						>
							<Icon name="tabler:copy" class="h-4 w-4" />
						</Button>
					</div>
					<p class="text-muted-foreground text-sm">Leiten Sie das Passwort an den Benutzer weiter. Es kann später zurückgesetzt, jedoch nicht mehr abgerufen werden.</p>
				</div>
				<DialogFooter class="gap-2">
					<Button type="button" variant="outline" @click="closeModals">
						Abbrechen
					</Button>
					<Button type="submit">Benutzer hinzufügen</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>

	<!-- Edit User Dialog -->
	<Dialog v-model:open="showEditModal">
		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Benutzer bearbeiten</DialogTitle>
			</DialogHeader>
			<form @submit.prevent="updateUser" class="space-y-4">
				<div class="space-y-2">
					<Label for="firstName">Vorname</Label>
					<Input id="firstName" v-model="formData.firstName" required
						placeholder="Vor- und Mittelnamen eingeben" />
				</div>
				<div class="space-y-2">
					<Label for="lastName">Nachname</Label>
					<Input id="lastName" v-model="formData.lastName" required placeholder="Nachname eingeben" />
				</div>
				<div class="space-y-2">
					<Label for="email">Email Adresse</Label>
					<Input id="email" v-model="formData.email" type="email" required
						placeholder="Email Adresse eingeben" />
				</div>
				<div class="gap-x-2 flex items-center">
					<Checkbox v-model="formData.isAdmin" />
					<Label for="role">Administratorberechtigungen</Label>
				</div>
				<DialogFooter class="gap-2">
					<Button type="button" variant="outline" @click="closeModals">
						Abbrechen
					</Button>
					<Button type="submit">
						Änderungen speichern
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
				<p>Sind Sie sich sicher, dass Sie den Benutzer <strong>{{ selectedUser?.firstName + ' ' + selectedUser?.lastName
				}}</strong>
					löschen möchten?</p>
				<AlertDialogDescription>
					Diese Aktion kann nicht rückgängig gemacht werden.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel @click="closeModals">Abbrechen</AlertDialogCancel>
				<AlertDialogAction @click="deleteUser" class="bg-destructive text-white hover:bg-destructive/90">
					Benutzer löschen
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>