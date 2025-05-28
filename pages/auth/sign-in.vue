<script setup>
definePageMeta({
  layout: 'fullwidth'
})

useSeoMeta({
  title: 'Stackalog — Anmelden'
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <img class="w-16 hidden dark:block mx-auto" src="/icon-white.svg" />
        <img class="w-16 block dark:hidden mx-auto" src="/icon-black.svg" />
        <CardTitle class="text-2xl font-bold text-center">Anmelden</CardTitle>
        <CardDescription class="text-center">
          Gib deine E-Mail-Adresse und dein Passwort ein, um auf dein Konto zuzugreifen
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <form class="space-y-4">
          <div class="space-y-2">
            <Label for="email">E-Mail</Label>
            <Input id="email" type="email" placeholder="max.mustermann@example.com" required />
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="password">Passwort</Label>
              <NuxtLink href="/auth/forgot-password" class="text-sm text-blue-600 hover:underline">
                Passwort vergessen?
              </NuxtLink>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" class="w-full">
            Anmelden
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p class="text-center text-sm text-muted-foreground w-full">
          Du hast noch kein Konto?
          <NuxtLink to="/auth/sign-up" class="text-blue-600 hover:underline font-medium">
            Registrieren
          </NuxtLink>
        </p>
      </CardFooter>
    </Card>
  </div>
</template>
