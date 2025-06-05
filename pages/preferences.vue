<script setup>
useSeoMeta({
  title: 'Stackalog — Präferenzen'
})

const colorMode = useColorMode()
const ready = ref(false)

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

onMounted(() => {
  // Allow the DOM to finish hydration and colorMode to stabilize
  nextTick(() => {
    ready.value = true
  })
})
</script>

<template>
  <div class="space-y-2 mb-6">
    <h1 class="text-3xl font-bold">Präferenzen</h1>
    <p class="text-muted-foreground">Verwalten Sie Ihren Account</p>
  </div>

  <div class="grid grid-cols-2 gap-8">
    <div class="grid grid-cols-1 grid-rows-2 place-items-start gap-8 w-full">
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Icon name="tabler:user" />
            Profil
          </CardTitle>
          <CardDescription>Aktualisieren Sie Ihre persönlichen Informationen und Account Details</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-row gap-12">
          <div class="flex items-center gap-4">
            <Avatar class="h-20 w-20">
              <!-- <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" /> -->
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
          </div>

          <div class="flex flex-col gap-4 w-full">
            <div class="space-y-2">
              <Label htmlFor="firstName">Vor- und Mittelname(n)</Label>
              <Input id="firstName" placeholder="Max" defaultValue="Max" />
            </div>
            <div class="space-y-2">
              <Label htmlFor="lastName">Nachname</Label>
              <Input id="lastName" placeholder="Mustermann" defaultValue="Mustermann" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Icon name="tabler:globe" />
            Erscheinung
          </CardTitle>
          <CardDescription>Passen Sie die Erscheinung an</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <Label class="text-base">Theme</Label>
              <p class="text-sm text-muted-foreground">Wählen Sie zwischen Dark- und Lightmode</p>
            </div>
            <div v-if="ready" class="flex items-center gap-2">
              <Icon name="tabler:sun" />
              <Switch :model-value="isDark" @update:model-value="() => isDark = !isDark" aria-label="Theme auswählen" />
              <Icon name="tabler:moon" />
            </div>
            <div v-else>
              <Skeleton class="h-4 w-16" />
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
    <div class="w-full">
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Icon name="tabler:mail" />
            Account
          </CardTitle>
          <CardDescription>Verwalten Sie Ihre Kontaktinformation und Regionseinstellungen</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="space-y-2">
            <Label htmlFor="email">Email Adresse</Label>
            <div class="flex gap-2">
              <Input id="email" type="email" placeholder="max.mustermann@example.com"
                defaultValue="max.mustermann@example.com" class="flex-1" />
            </div>
          </div>

          <div class="space-y-2">
            <Label>Passwort</Label>
            <div class="flex gap-2">
              <Input type="password" placeholder="••••••••" disabled class="flex-1" />
              <Button variant="outline">Passwort ändern</Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  </div>


  <div class="flex justify-end gap-2 mt-8">
    <Button variant="outline">Abbrechen</Button>
    <Button>Änderungen speichern</Button>
  </div>
</template>