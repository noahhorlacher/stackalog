<script setup>
// Mock data
const users = ref([
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "admin",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "user",
    createdAt: "2024-01-20"
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com",
    role: "user",
    createdAt: "2024-02-01"
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@example.com",
    role: "admin",
    createdAt: "2024-02-10"
  }
])

const formData = ref({
    firstName: "",
    lastName: "",
    role: "user",
    createdAt: ""
})

  const openEditDialog = user => {
    formData.value = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    }
  }

  const resetForm = () => {
    formData.value = { firstName: "", lastName: "", email: "", role: "user" }
  }
</script>

<template>
    <div class="min-h-screen p-6">
      <div class="max-w-7xl mx-auto space-y-6">

        <!-- title -->
        <div class="flex items-center justify-between gap-14">
            <div class="space-y-2 mb-6">
                <h1 class="text-3xl font-bold">Benutzerverwaltung</h1>
                <p class="text-muted-foreground">Benutzeraccounts und Berechtigungen verwalten</p>
            </div>

            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <Icon name="tabler:users" class="w-8 h-8 text-blue-600" />
                    <Badge variant="secondary" class="px-3 py-1">
                        {{ users.length }} Benutzer Total
                    </Badge>
                </div>

                <!-- add user dialog -->
                <Dialog>
                    <DialogTrigger>
                        <Button @click="resetForm">
                            <Icon name="tabler:plus" />
                            Benutzer hinzufügen
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                            <DialogDescription>Create a new user account with the information below.</DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-4 py-4">
                            <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="Max"
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Mustermann"
                                />
                            </div>
                            </div>
                            <div class="space-y-2">
                                <Label for="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="max.mustermann@example.com"
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="role">Role</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">
                            Cancel
                            </Button>
                            <Button>Add User</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>

        <!-- search field -->
        <div class="relative mb-12">
            <Icon name="tabler:search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Benutzer durchsuchen..."
                class="pl-10 pr-4"
            />
        </div>

        <!-- user table -->
        <div class="rounded-md border" v-if="users.length > 0">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(user, index) of users" :key="`userrow-${index}`">
                        <TableCell class="font-medium">
                        {{user.firstName}} {{user.lastName}}
                        </TableCell>
                        <TableCell>{{user.email}}</TableCell>
                        <TableCell>
                        <Badge :variant="user.role === 'admin' ? 'default' : 'secondary'">{{user.role}}</Badge>
                        </TableCell>
                        <TableCell>{{user.createdAt}}</TableCell>
                        <TableCell class="text-right">
                        <div class="flex items-center justify-end gap-2">
                        
                        <!-- edit user dialog -->
                        <Dialog>
                            <DialogTrigger>
                                <Button variant="outline" size="sm" @click="openEditDialog(user)">
                                    <Icon name="tabler:edit" class="w-4 h-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit User</DialogTitle>
                                    <DialogDescription>Update the user information below.</DialogDescription>
                                </DialogHeader>
                                <div class="grid gap-4 py-4">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="space-y-2">
                                        <Label for="editFirstName">First Name</Label>
                                        <Input
                                            id="editFirstName"
                                            placeholder="John"
                                        />
                                        </div>
                                        <div class="space-y-2">
                                        <Label for="editLastName">Last Name</Label>
                                        <Input
                                            id="editLastName"
                                            placeholder="Doe"
                                        />
                                        </div>
                                    </div>
                                    <div class="space-y-2">
                                        <Label for="editEmail">Email</Label>
                                        <Input
                                        id="editEmail"
                                        type="email"
                                        placeholder="john.doe@example.com"
                                        />
                                    </div>
                                    <div class="space-y-2">
                                        <Label for="editRole">Role</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="user">User</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Save Changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <!-- delete user dialog -->
                        <AlertDialog>
                            <AlertDialogTrigger>
                            <Button variant="outline" size="sm">
                                <Icon name="tabler:trash" class="w-4 h-4" />
                            </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the user account for {{user.firstName}} {{user.lastName}}.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        <!-- no users -->
        <div class="text-center py-8" v-else>
            <Icon name="tabler:users" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-500">No users found matching your search.</p>
        </div>
      </div>
    </div>
</template>