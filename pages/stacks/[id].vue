<script setup>
useSeoMeta({
  title: 'Stackalog — Stack'
})

const stack = ref({
    id: null,
    title: '',
    logs: []
})

const { params } = useRoute()
const { data: stackData, error: stackError } = await useFetch(`http://localhost:5000/api/stacks/${params.id}`)

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