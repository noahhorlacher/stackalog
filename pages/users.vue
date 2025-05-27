<template>
  <div class="min-h-screen bg-background p-6">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold tracking-tight">User Management</h1>
        <p class="text-muted-foreground">Manage your users and their information</p>
      </div>

      <!-- Search and Add User Section -->

        <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div class="relative flex-1 max-w-md">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
            v-model="searchQuery"
            placeholder="Search users by name, email, or role..."
            class="pl-10"
            />
        </div>
        <Button @click="openAddModal" class="flex items-center gap-2">
            <Plus class="h-4 w-4" />
            Add User
        </Button>
        </div>

      <!-- Users Table -->
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="user in filteredUsers" :key="user.id">
                <TableCell>
                  <div class="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{{ user.name.charAt(0).toUpperCase() }}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div class="font-medium">{{ user.name }}</div>
                      <div class="text-sm text-muted-foreground">{{ user.email }}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge :variant="getRoleVariant(user.role)">
                    {{ user.role }}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge :variant="user.status === 'Active' ? 'default' : 'secondary'">
                    {{ user.status }}
                  </Badge>
                </TableCell>
                <TableCell class="text-muted-foreground">
                  {{ formatDate(user.joinedAt) }}
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="viewUser(user)"
                      class="h-8 w-8 p-0"
                    >
                      <Eye class="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="editUser(user)"
                      class="h-8 w-8 p-0"
                    >
                      <Edit class="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="deleteUser(user)"
                      class="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 class="h-4 w-4" />
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
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <div v-if="selectedUser" class="space-y-6">
            <div class="text-center">
              <Avatar class="h-16 w-16 mx-auto mb-4">
                <AvatarFallback class="text-xl">
                  {{ selectedUser.name.charAt(0).toUpperCase() }}
                </AvatarFallback>
              </Avatar>
              <h4 class="text-lg font-medium">{{ selectedUser.name }}</h4>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="font-medium">Email:</span>
                <span class="text-muted-foreground">{{ selectedUser.email }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">Role:</span>
                <Badge :variant="getRoleVariant(selectedUser.role)">{{ selectedUser.role }}</Badge>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">Status:</span>
                <Badge :variant="selectedUser.status === 'Active' ? 'default' : 'secondary'">
                  {{ selectedUser.status }}
                </Badge>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">Joined:</span>
                <span class="text-muted-foreground">{{ formatDate(selectedUser.joinedAt) }}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <!-- Add/Edit User Dialog -->
      <Dialog v-model:open="showFormModal">
        <DialogContent class="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{{ showAddModal ? 'Add New User' : 'Edit User' }}</DialogTitle>
          </DialogHeader>
          <form @submit.prevent="saveUser" class="space-y-4">
            <div class="space-y-2">
              <Label for="name">Name</Label>
              <Input
                id="name"
                v-model="formData.name"
                required
                placeholder="Enter user name"
              />
            </div>
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="formData.email"
                type="email"
                required
                placeholder="Enter email address"
              />
            </div>
            <div class="space-y-2">
              <Label for="role">Role</Label>
              <Select v-model="formData.role">
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
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
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter class="gap-2">
              <Button type="button" variant="outline" @click="closeModals">
                Cancel
              </Button>
              <Button type="submit">
                {{ showAddModal ? 'Add User' : 'Save Changes' }}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <!-- Delete Confirmation Dialog -->
      <AlertDialog v-model:open="showDeleteModal">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{{ selectedUser?.name }}</strong>? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel @click="closeModals">Cancel</AlertDialogCancel>
            <AlertDialogAction @click="confirmDelete" class="bg-destructive text-white hover:bg-destructive/90">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { Search, Plus, Eye, Edit, Trash2, Users } from 'lucide-vue-next'

// shadcn-vue components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    joinedAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'Active',
    joinedAt: '2024-02-20'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'Viewer',
    status: 'Inactive',
    joinedAt: '2024-01-10'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'Editor',
    status: 'Active',
    joinedAt: '2024-03-05'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'Admin',
    status: 'Active',
    joinedAt: '2024-02-28'
  },
  {
    id: 6,
    name: 'Lisa Davis',
    email: 'lisa.davis@example.com',
    role: 'Viewer',
    status: 'Active',
    joinedAt: '2024-03-12'
  }
])

// Computed properties
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.role.toLowerCase().includes(query)
  )
})

// Methods
const getRoleVariant = (role) => {
  const variants = {
    'Admin': 'destructive',
    'Editor': 'default',
    'Viewer': 'secondary'
  }
  return variants[role] || 'secondary'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
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
  formData.name = user.name
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
      name: formData.name,
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
        name: formData.name,
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
  formData.name = ''
  formData.email = ''
  formData.role = 'Viewer'
  formData.status = 'Active'
}
</script>