<script setup>
import { toast } from 'vue-sonner'

useSeoMeta({
  title: 'Stackalog — Stack'
})

const stack = ref({
    id: null,
    title: '',
    logs: []
})

const { params } = useRoute()
const { data: stackData, error: stackError } = await useFetch(`/api/stacks/${params.id}`)
if (stackError.value) {
    toast('Fehler', {
        description: 'Fehler beim Laden des Stacks. Kontaktieren Sie den Support.'
    })
} else if (!stackData.value) {
    toast('Nicht gefunden', {
        description: 'Der angeforderte Stack wurde nicht gefunden.'
    })
}

stack.value = stackData.value
</script>

<template>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/stacks">Stacks</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{{ stack.title }}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>

    <div class="space-y-2 my-6">
		<h1 class="text-3xl font-bold">{{ stack.title }}</h1>
		<p class="text-muted-foreground">{{ stack.description }}</p>
	</div>
</template>