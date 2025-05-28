<script setup>
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
    role: 'Administrator',
    status: 'Active',
    joinedAt: '2024-01-15'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    role: 'Benutzer',
    status: 'Active',
    joinedAt: '2024-02-20'
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    role: 'Benutzer',
    status: 'Inactive',
    joinedAt: '2024-01-10'
  },
  {
    id: 4,
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@example.com',
    role: 'Administrator',
    status: 'Active',
    joinedAt: '2024-03-05'
  },
  {
    id: 5,
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    role: 'Benutzer',
    status: 'Active',
    joinedAt: '2024-02-28'
  },
  {
    id: 6,
    firstName: 'Lisa',
    lastName: 'Davis',
    email: 'lisa.davis@example.com',
    role: 'Benutzer',
    status: 'Active',
    joinedAt: '2024-03-12'
  }
])

// Computed properties
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user =>
    user.firstName.toLowerCase().includes(query) ||
    user.lastName.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.role.toLowerCase().includes(query)
  )
})

// Methods
const getRoleVariant = (role) => {
  const variants = {
    'Administrator': 'default',
    'Benutzer': 'outline'
  }
  return variants[role] || 'secondary'
}

// Methods
const getRoleIcon = (role) => {
  const variants = {
    'Administrator': 'tabler:shield-check',
    'Benutzer': 'tabler:user'
  }
  return variants[role] || 'secondary'
}

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
  formData.role = user.role
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
      role: formData.role,
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
        role: formData.role,
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
  formData.role = 'Viewer'
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
    <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div class="relative flex-1 max-w-md">
            <Icon name="tabler:search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
            v-model="searchQuery"
            placeholder="Nutzer mit Name, Email oder Rolle suchen..."
            class="pl-10"
            />
        </div>
        <Button @click="openAddModal" class="flex items-center gap-2">
            <Icon name="tabler:plus" />
            Benutzer hinzufügen
        </Button>
    </div>

    <!-- Users Table -->
    <Table>
    <TableHeader>
        <TableRow>
        <TableHead>Benutzer</TableHead>
        <TableHead>Rolle</TableHead>
        <TableHead>Status</TableHead>
        <TableHead class="text-right">Aktionen</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow v-for="user in filteredUsers" :key="user.id">
        <TableCell>
            <div class="flex items-center gap-3">
            <Avatar>
                <AvatarFallback>{{ user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase() }}</AvatarFallback>
            </Avatar>
            <div>
                <div class="font-medium">{{ user.firstName + ' ' + user.lastName }}</div>
                <div class="text-sm text-muted-foreground">{{ user.email }}</div>
            </div>
            </div>
        </TableCell>
        <TableCell>
            <Badge :variant="getRoleVariant(user.role)">
            <Icon :name="getRoleIcon(user.role)" />
            {{ user.role }}
            </Badge>
        </TableCell>
        <TableCell>
            <Badge :variant="user.status === 'Active' ? 'default' : 'secondary'">
            {{ user.status === 'Active' ? 'Aktiv' : 'Inaktiv' }}
            </Badge>
        </TableCell>
        <TableCell class="text-right">
            <div class="flex justify-end gap-1">
            <Button
                variant="ghost"
                size="sm"
                @click="viewUser(user)"
                class="h-8 w-8 p-0"
            >
                <Icon name="tabler:eye" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                @click="editUser(user)"
                class="h-8 w-8 p-0"
            >
                <Icon name="tabler:edit" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                @click="deleteUser(user)"
                class="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
                <Icon name="tabler:trash" />
            </Button>
            </div>
        </TableCell>
        </TableRow>
    </TableBody>
    </Table>

    <!-- Empty State -->
    <div v-if="filteredUsers.length === 0" class="text-center py-12">
    <Users class="mx-auto h-12 w-12 text-muted-foreground" />
    <h3 class="mt-2 text-sm font-medium">No users found</h3>
    <p class="mt-1 text-sm text-muted-foreground">
        {{ searchQuery ? 'Try adjusting your search criteria.' : 'Get started by adding a new user.' }}
    </p>
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
                    <Badge :variant="getRoleVariant(selectedUser.role)">
                        <Icon :name="getRoleIcon(selectedUser.role)" />
                        {{ selectedUser.role }}
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
            <Input
            id="firstName"
            v-model="formData.firstName"
            required
            placeholder="Vor- und Mittelnamen eingeben"
            />
        </div>
        <div class="space-y-2">
            <Label for="lastName">Nachname</Label>
            <Input
            id="lastName"
            v-model="formData.lastName"
            required
            placeholder="Nachname eingeben"
            />
        </div>
        <div class="space-y-2">
            <Label for="email">Email Adresse</Label>
            <Input
            id="email"
            v-model="formData.email"
            type="email"
            required
            placeholder="Email Adresse eingeben"
            />
        </div>
        <div class="space-y-2">
            <Label for="role">Rolle</Label>
            <Select v-model="formData.role">
            <SelectTrigger>
                <SelectValue placeholder="Rolle wählen" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Administrator">Administrator</SelectItem>
                <SelectItem value="Benutzer">Benutzer</SelectItem>
            </SelectContent>
            </Select>
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
        <p>Sind Sie sich sicher, dass Sie <strong>{{ selectedUser?.firstName + ' ' + selectedUser?.lastName }}</strong> löschen möchten?</p> 
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