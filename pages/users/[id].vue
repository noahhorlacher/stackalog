<script setup>
import { toast } from 'vue-sonner'

useSeoMeta({
    title: 'Stackalog — User'
})

const user = ref({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: ''
})

const { params } = useRoute()
const { data: userData, error: userError } = await useFetch(`/api/users/${params.id}`)

if (userError.value) {
    toast('Fehler', {
        description: 'Fehler beim Laden des Benutzers. Kontaktieren Sie den Support.'
    })
}

user.value = userData.value
</script>

<template>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/logs">Benutzer</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{{ user.name }}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>

    <div class="space-y-2 my-6">
        <Avatar>
            <AvatarFallback>{{ user.firstName.charAt(0).toUpperCase() +
                user.lastName.charAt(0).toUpperCase() }}
            </AvatarFallback>
        </Avatar>
        <h1 class="text-3xl font-bold">{{ user.firstName + ' ' + user.lastName }}</h1>
        <p>{{ user.email }}</p>
        <RoleBadge :user />
    </div>
</template>