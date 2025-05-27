<script setup>
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
      <h1 class="text-3xl font-bold">Ihr Account</h1>
      <p class="text-muted-foreground">Verwalten Sie Ihre Account Einstellungen</p>
    </div>

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Icon name="tabler:user" />
            Profil
          </CardTitle>
          <CardDescription>Aktualisieren Sie Ihre persönlichen Informationen und Account Details</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="flex items-center gap-4">
            <Avatar class="h-20 w-20">
              <!-- <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" /> -->
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
            <div class="space-y-2">
              <Button variant="outline" size="sm">
                Foto ändern
              </Button>
              <p class="text-sm text-muted-foreground">JPG, GIF oder PNG. Maximum 1MB</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label htmlFor="firstName">Vorname</Label>
              <Input id="firstName" placeholder="Max" defaultValue="Max" />
            </div>
            <div class="space-y-2">
              <Label htmlFor="lastName">Nachname</Label>
              <Input id="lastName" placeholder="Mustermann" defaultValue="Mustermann" />
            </div>
          </div>

          <div class="space-y-2">
            <Label htmlFor="bio">Profil Beschreibung</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              defaultValue="Software developer passionate about creating amazing user experiences."
              class="min-h-[100px]"
            />
            <p class="text-sm text-muted-foreground">Eine kurze Beschreibung für Ihr Profil.</p>
          </div>
        </CardContent>
      </Card>

      <Card class="mt-8">
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
              <Input
                id="email"
                type="email"
                placeholder="max.mustermann@example.com"
                defaultValue="max.mustermann@example.com"
                class="flex-1"
              />
              <Button variant="outline">Verifizieren</Button>
            </div>
            <p class="text-sm text-muted-foreground">Wir senden Ihnen eine Email um Ihre Änderung zu bestätigen.</p>
          </div>

          <div class="space-y-2">
            <Label htmlFor="phone">Telefonnummer</Label>
            <Input id="phone" type="tel" placeholder="+41234567890" defaultValue="+41234567890" />
          </div>

          <div class="space-y-2">
            <Label htmlFor="language">Sprache</Label>
            <Select defaultValue="de">
              <SelectTrigger>
                <SelectValue placeholder="Sprache wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">Englisch</SelectItem>
                <SelectItem value="es">Spanisch</SelectItem>
                <SelectItem value="fr">Französisch</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ja">Japanisch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label htmlFor="timezone">Zeitzone</Label>
            <Select defaultValue="utc-5">
              <SelectTrigger>
                <SelectValue placeholder="Zeitzone wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                <SelectItem value="utc+0">UTC</SelectItem>
                <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card class="mt-8">
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

          <Separator />

          <div class="space-y-2">
            <Label htmlFor="fontSize">Textgrösse</Label>
            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Klein</SelectItem>
                <SelectItem value="medium">Mittel</SelectItem>
                <SelectItem value="large">Gross</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card class="mt-8">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Icon name="tabler:bell" />
            Benachrichtigungen
          </CardTitle>
          <CardDescription>Konfigurieren Sie, wie Sie Nachrichten und Updates erhalten</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <Label class="text-base">Email Benachrichtigungen</Label>
              <p class="text-sm text-muted-foreground">Benachrichtigungen via Email erhalten</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <Label class="text-base">Push Benachrichtigungen</Label>
              <p class="text-sm text-muted-foreground">Push Benachrichtigungen im Browser erhalten</p>
            </div>
            <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>

          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <Label class="text-base">Marketing Emails</Label>
              <p class="text-sm text-muted-foreground">Emails zu neuen Features und Updates erhalten</p>
            </div>
            <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
          </div>
        </CardContent>
      </Card>

      <Card class="mt-8">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Icon name="tabler:shield" />
            Sicherheit
          </CardTitle>
          <CardDescription>Verwalten Sie Ihre Accountsicherheit</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="space-y-2">
            <Label>Passwort</Label>
            <div class="flex gap-2">
              <Input type="password" placeholder="••••••••" disabled class="flex-1" />
              <Button variant="outline">Passwort ändern</Button>
            </div>
            <p class="text-sm text-muted-foreground">Zuletzt geändert vor 3 Monaten</p>
          </div>

          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <Label class="text-base">Zwei-Faktor Authentifizierung</Label>
              <div class="flex items-center gap-2">
                <p class="text-sm text-muted-foreground">Ein weiterer Sicherheitslayer</p>
                <Badge variant="secondary">Deaktiviert</Badge>
              </div>
            </div>
            <Button variant="outline">2FA Aktivieren</Button>
          </div>

          <div class="space-y-2">
            <Label>Aktive Sessions</Label>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p class="font-medium">Momentane Session</p>
                  <p class="text-sm text-muted-foreground">Chrome auf macOS • San Francisco, CA</p>
                </div>
                <Badge variant="outline">Aktiv</Badge>
              </div>
              <div class="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p class="font-medium">Mobile App</p>
                  <p class="text-sm text-muted-foreground">iPhone • Vor 2 Stunden</p>
                </div>
                <Button variant="ghost" size="sm">
                  Zurückrufen
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="border-destructive mt-8">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-destructive">
            <Icon name="tabler:trash" />
            Danger Zone
          </CardTitle>
          <CardDescription>Diese Aktionen können nicht rückgängig gemacht werden.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between gap-8">
            <div class="space-y-1">
              <Label class="text-base">Account löschen</Label>
              <p class="text-sm text-muted-foreground">Löschen Sie Ihren Account und die assoziierten Informationen permanent.</p>
            </div>
            <Button variant="destructive">Account Löschen</Button>
          </div>
        </CardContent>
      </Card>

      <div class="flex justify-end gap-2 mt-8">
        <Button variant="outline">Abbrechen</Button>
        <Button>Änderungen Speichern</Button>
      </div>
</template>