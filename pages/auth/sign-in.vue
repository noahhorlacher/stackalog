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
                <AlertDialog class="mt-4">
                  <AlertDialogTrigger asChild>
                    <Button variant="link">
                      Passwort vergessen?
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent class="sm:max-w-sm">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Passwort vergessen?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Kontaktiere unseren Support, um dein Passwort zurückzusetzen. Wir helfen dir gerne weiter! support@example.com
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Schließen</AlertDialogCancel>
                    <AlertDialogAction as-child>
                      <NuxtLink to="mailto:support@example.com">
                        <Button variant="primary">
                          E-Mail senden
                        </Button>
                      </NuxtLink>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </div>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" class="w-full">
            Anmelden
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
