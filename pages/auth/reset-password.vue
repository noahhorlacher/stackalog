<script setup>
definePageMeta({
    layout: 'fullwidth'
})
</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4">
      <Card class="w-full max-w-md">
        <CardHeader class="space-y-1">
            <img class="w-16 hidden dark:block mx-auto" src="/icon-white.svg" />
            <img class="w-16 block dark:hidden mx-auto" src="/icon-black.svg" />
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
            <Icon name="tabler:shield" size="28" class="w-6 h-6 text-green-600" />
          </div>
          <CardTitle class="text-2xl font-bold text-center">Passwort zurücksetzen</CardTitle>
          <CardDescription class="text-center">
            Gib unten dein neues Passwort ein, um dein Konto zurückzusetzen.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <form class="space-y-4">
            <div class="space-y-2">
              <Label for="password">Neues Passwort</Label>
              <Input id="password" type="password" required />
              <p class="text-xs text-muted-foreground">Muss mindestens 8 Zeichen lang sein</p>
            </div>

            <div class="space-y-2">
              <Label for="confirmPassword">Neues Passwort bestätigen</Label>
              <Input id="confirmPassword" type="password" required />
            </div>

            <Button type="submit" class="w-full">
              Passwort aktualisieren
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <NuxtLink
            to="/auth/sign-in"
            class="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center"
          >
            <Icon name="tabler:arrow-left" class="mr-2" />
            Zurück zur Anmeldung
          </NuxtLink>
        </CardFooter>
      </Card>
    </div>
</template>
