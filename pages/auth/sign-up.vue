<script setup>
definePageMeta({
    layout: 'fullwidth'
})

useSeoMeta({
  title: 'Stackalog — Account erstellen'
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-8">
    <Card class="w-full max-w-xl">
      <CardHeader class="space-y-1">
        <img class="w-16 hidden dark:block mx-auto" src="/icon-white.svg" />
        <img class="w-16 block dark:hidden mx-auto" src="/icon-black.svg" />
        <CardTitle class="text-2xl font-bold text-center">Konto erstellen</CardTitle>
        <CardDescription class="text-center">Gib deine Informationen ein, um dein Konto zu erstellen</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <form class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="firstName">Vorname</Label>
              <Input id="firstName" placeholder="Max" required />
            </div>
            <div class="space-y-2">
              <Label for="lastName">Nachname</Label>
              <Input id="lastName" placeholder="Mustermann" required />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="email">E-Mail</Label>
            <Input id="email" type="email" placeholder="max@example.com" required />
          </div>

          <div class="space-y-2">
            <Label for="password">Passwort</Label>
            <Input id="password" type="password" required />
            <p class="text-xs text-muted-foreground">Muss mindestens 8 Zeichen lang sein</p>
          </div>

          <div class="space-y-2">
            <Label for="confirmPassword">Passwort bestätigen</Label>
            <Input id="confirmPassword" type="password" required />
          </div>

          <div class="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label
              for="terms"
              class="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ich stimme den
              <NuxtLink to="/terms" class="text-blue-600 hover:underline">
                Nutzungsbedingungen
              </NuxtLink>
              und der
              <NuxtLink to="/privacy" class="text-blue-600 hover:underline">
                Datenschutzerklärung
              </NuxtLink>
              zu
            </Label>
          </div>

          <Button type="submit" class="w-full">
            Konto erstellen
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p class="text-center text-sm text-muted-foreground w-full">
          Du hast bereits ein Konto?
          <NuxtLink to="/auth/sign-in" class="text-blue-600 hover:underline font-medium">
            Anmelden
          </NuxtLink>
        </p>
      </CardFooter>
    </Card>
  </div>
</template>
