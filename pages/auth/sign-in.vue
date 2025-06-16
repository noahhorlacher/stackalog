<script setup>
definePageMeta({
  layout: 'fullwidth'
})

useSeoMeta({
  title: 'Stackalog — Anmelden'
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-500/5 to-violet-500/5">
    <Card class="w-full max-w-sm bg-gradient-to-br from-violet-500/5 via-purple-500/2 to-blue-500/5">
      <CardHeader class="space-y-1">
        <img class="w-16 hidden dark:block mx-auto bg-gradient-to-br from-blue-400 to-violet-400 rounded-lg shadow-violet-400/30 shadow-lg" src="/icon-white.svg" />
        <img class="w-16 block dark:hidden mx-auto bg-gradient-to-br from-blue-400 to-violet-400 rounded-lg shadow-violet-400/30 shadow-lg" src="/icon-black.svg" />
        
        <CardTitle class="text-3xl font-bold text-center mt-6">Anmelden</CardTitle>
        <CardDescription class="text-center">
          Gib deine E-Mail-Adresse und dein Passwort ein, um auf dein Konto zuzugreifen
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <form class="space-y-4">
          <div class="space-y-2">
            <Label for="email"><Icon name="tabler:mail" />E-Mail</Label>
            <Input id="email" type="email" placeholder="max.mustermann@example.com" required />
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="password"><Icon name="tabler:key"/>Passwort</Label>
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
          <CTAButton type="submit" class="mt-8 w-full cursor-pointer">
            Anmelden
          </CTAButton>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
