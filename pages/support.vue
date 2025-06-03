<script setup>
useSeoMeta({
  title: 'Stackalog — Support'
})

const supportHours = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '18:00' },
  saturday: { open: '10:00', close: '16:00' },
  sunday: null // closed
}

const supportContact = {
  email: 'support@example.com',
  phone: '+41 12 345 67 89'
}

const securityContact = {
  email: 'security@example.com',
  phone: '+41 23 456 78 90'
}

// FAQ data
const faqItems = [
  {
    category: "account",
    question: "Wie setze ich mein Passwort zurück?",
    answer:
      "Um Ihr Passwort zurückzusetzen, klicken Sie auf der Anmeldeseite auf den Link 'Passwort vergessen'. Sie erhalten eine E-Mail mit Anweisungen zum Erstellen eines neuen Passworts. Überprüfen Sie auch Ihren Spam-Ordner, falls Sie die E-Mail nicht im Posteingang finden.",
  },
  {
    category: "account",
    question: "Wie ändere ich meine E-Mail-Adresse?",
    answer:
      "Sie können Ihre E-Mail-Adresse in den Kontoeinstellungen ändern. Gehen Sie zu Ihrem Profil, klicken Sie auf 'Profil bearbeiten' und aktualisieren Sie Ihre E-Mail-Adresse. Die neue E-Mail-Adresse muss verifiziert werden, bevor die Änderung wirksam wird.",
  },
  {
    category: "account",
    question: "Kann ich mehrere Benutzerkonten haben?",
    answer:
      "Nein, unsere Richtlinie erlaubt nur ein Konto pro Nutzer. Das Erstellen mehrerer Konten kann zur Sperrung führen. Wenn Sie zusätzlichen Zugriff für Teammitglieder benötigen, verwenden Sie bitte unsere Teamverwaltungsfunktionen.",
  },
  {
    category: "billing",
    question: "Wie aktualisiere ich meine Zahlungsinformationen?",
    answer:
      "Um Ihre Zahlungsinformationen zu aktualisieren, gehen Sie zu 'Kontoeinstellungen' > 'Abrechnung' und klicken Sie auf 'Zahlungsmethode aktualisieren'. Dort können Sie eine neue Karte hinzufügen oder bestehende Zahlungsdetails bearbeiten.",
  },
  {
    category: "billing",
    question: "Wann werde ich für mein Abonnement belastet?",
    answer:
      "Ihr Abonnement wird zu Beginn jedes Abrechnungszeitraums berechnet. Bei monatlichen Plänen erfolgt die Abrechnung jeweils am gleichen Datum. Bei jährlichen Plänen einmal im Jahr am Jahrestag Ihres Abonnements.",
  },
  {
    category: "billing",
    question: "Wie kündige ich mein Abonnement?",
    answer:
      "Um Ihr Abonnement zu kündigen, gehen Sie zu 'Kontoeinstellungen' > 'Abrechnung' > 'Abonnement' und klicken Sie auf 'Abonnement kündigen'. Ihr Zugang bleibt bis zum Ende des aktuellen Abrechnungszeitraums bestehen.",
  },
  {
    category: "features",
    question: "Wie erstelle ich einen neuen Benutzer?",
    answer:
      "Um einen neuen Benutzer zu erstellen, gehen Sie zur Benutzerverwaltungsseite und klicken Sie auf die Schaltfläche 'Benutzer hinzufügen'. Füllen Sie die erforderlichen Informationen aus und klicken Sie auf 'Benutzer erstellen'. Der neue Benutzer erhält eine E-Mail-Einladung zur Einrichtung seines Kontos.",
  },
  {
    category: "features",
    question: "Was ist der Unterschied zwischen Benutzerrollen?",
    answer:
      "Wir bieten drei Benutzerrollen an: Admin, Moderator und Benutzer. Admins haben vollständigen Zugriff auf alle Funktionen und Einstellungen. Moderatoren können Inhalte verwalten, aber keine Systemeinstellungen ändern. Benutzer haben grundlegenden Zugriff auf die Plattform, können aber keine Einstellungen oder andere Benutzer ändern.",
  },
  {
    category: "features",
    question: "Wie exportiere ich Benutzerdaten?",
    answer:
      "Um Benutzerdaten zu exportieren, gehen Sie zur Benutzerverwaltungsseite, filtern Sie die gewünschten Benutzer und klicken Sie auf die Schaltfläche 'Exportieren'. Sie können zwischen CSV-, Excel- oder PDF-Formaten wählen.",
  },
  {
    category: "technical",
    question: "Welche Browser werden unterstützt?",
    answer:
      "Unsere Plattform unterstützt die neuesten Versionen von Chrome, Firefox, Safari und Edge. Internet Explorer wird nicht unterstützt. Für die beste Erfahrung empfehlen wir, Ihren Browser stets auf dem neuesten Stand zu halten.",
  },
  {
    category: "technical",
    question: "Gibt es eine mobile App?",
    answer:
      "Ja, wir bieten mobile Apps für iOS und Android an. Sie können sie im App Store oder im Google Play Store herunterladen. Die mobilen Apps bieten die meisten Funktionen der Webplattform.",
  },
  {
    category: "technical",
    question: "Wie sicher sind meine Daten?",
    answer:
      "Sicherheit hat bei uns höchste Priorität. Alle Daten werden während der Übertragung und im Ruhezustand verschlüsselt. Wir verwenden branchenübliche Sicherheitsstandards, führen regelmäßige Audits durch und halten uns an geltende Datenschutzvorschriften.",
  },
]

const supportOnline = ref(isSupportOnline(supportHours))
// update support online
setInterval(() => {
  supportOnline.value = isSupportOnline(supportHours)
}, 60_000)

function isSupportOnline(hours) {
  const now = new Date()
  const dayIndex = now.getDay() // 0 = sunday
  const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const today = hours[dayMap[dayIndex]]

  if (!today) return false // no support today

  const [openHour, openMinute] = today.open.split(':').map(Number)
  const [closeHour, closeMinute] = today.close.split(':').map(Number)

  const openTime = new Date(now)
  openTime.setHours(openHour, openMinute, 0, 0)

  const closeTime = new Date(now)
  closeTime.setHours(closeHour, closeMinute, 0, 0)

  return now >= openTime && now <= closeTime
}

function isSubmitting() {
  // This function should return true if the form is currently being submitted
  // For now, we will just return false
  return false
}
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">Support</h1>
      <p class="text-muted-foreground">
        Unser Supportteam ist für Sie da
      </p>
    </div>

    <Tabs default-value="contact">
      <TabsList class="w-full mb-4">
        <TabsTrigger value="contact">
          <Icon name="tabler:phone" />
          Contact
        </TabsTrigger>
        <TabsTrigger value="faq">
          <Icon name="tabler:question-mark" />
          FAQ
        </TabsTrigger>
        <TabsTrigger value="documentation">
          <Icon name="tabler:file-certificate" />
          Dokumentation
        </TabsTrigger>
      </TabsList>

      <!-- contact section -->
      <TabsContent value="contact">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <Icon name="tabler:message" />
                  Schicken Sie eine Supportanfrage
                </CardTitle>
                <CardDescription>Füllen Sie das Formular unten aus und wir melden uns sobald wie möglich.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form @submit="" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <Label htmlFor="firstName">Vor- und Mittelname(n)*</Label>
                      <Input id="firstName" placeholder="Max" required />
                    </div>
                    <div class="space-y-2">
                      <Label htmlFor="lastName">Nachname*</Label>
                      <Input id="lastName" placeholder="Mustermann" required />
                    </div>
                  </div>

                  <div class="space-y-2">
                    <Label htmlFor="email">Email Adresse*</Label>
                    <Input id="email" type="email" placeholder="max.mustermann@example.com" required />
                  </div>

                  <div class="space-y-2">
                    <Label htmlFor="category">Kategorie*</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Kategorie wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">
                          <div class="flex items-center gap-2">
                            <Icon name="tabler:users" />
                            Account
                          </div>
                        </SelectItem>
                        <SelectItem value="technical">
                          <div class="flex items-center gap-2">
                            <Icon name="tabler:settings" />
                            Technisches Problem
                          </div>
                        </SelectItem>
                        <SelectItem value="security">
                          <div class="flex items-center gap-2">
                            <Icon name="tabler:shield" />
                            Sicherheit & Privatsphäre
                          </div>
                        </SelectItem>
                        <SelectItem value="other">
                          <div class="flex items-center gap-2">
                            <Icon name="tabler:help-circle" />
                            Anderes
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div class="space-y-2">
                    <Label htmlFor="priority">Priorität</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-green-500"></div>
                            Niedrig - Generelles Problem
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                            Mittel - Standard Problem
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                            Hoch - Dringendes Problem
                          </div>
                        </SelectItem>
                        <SelectItem value="critical">
                          <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-red-500"></div>
                            Kritisch - Service down
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div class="space-y-2">
                    <Label htmlFor="subject">Betreff*</Label>
                    <Input id="subject" placeholder="Eine Kurzbeschreibung Ihres Problems" required />
                  </div>

                  <div class="space-y-2">
                    <Label htmlFor="message">Nachricht*</Label>
                    <Textarea id="message"
                      placeholder="Bitte geben Sie detaillierte Informationen zu Ihrem Problem an, einschließlich aller Fehlermeldungen und Schritte, mit denen sich das Problem reproduzieren lässt."
                      class="min-h-[120px]" required />
                  </div>

                  <div class="space-y-2">
                    <Label>Anhänge</Label>
                    <div class="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Icon name="tabler:file-upload" class="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p class="text-sm text-muted-foreground mb-2">Drag und droppen Sie Dateien hier, oder klicken Sie,
                        um nach Dateien zu suchen.</p>
                      <input type="file" multiple class="hidden" id="file-upload"
                        accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt" />
                      <Button type="button" variant="outline" size="sm">
                        Dateien wählen
                      </Button>
                      <p class="text-xs text-muted-foreground mt-2">
                        Maximal 10MB pro Datei. Unterstützte Dateitypen: JPG, PNG, PDF, DOC, TXT
                      </p>
                    </div>

                  </div>

                  <Button type="submit" class="w-full" :disabled="isSubmitting">
                    Supportanfrage abschicken
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Alert>
              <AlertTitle class="flex items-center gap-2">
                <Icon name="tabler:alert-circle" />
                Dringende Sicherheitsprobleme
              </AlertTitle>
              <AlertDescription>
                Bei dringenden Sicherheitsproblemen kontaktieren Sie uns bitte umgehend unter {{ securityContact.email
                }}
                oder rufen Sie unsere Notfall-Hotline unter {{ securityContact.phone }} an.
              </AlertDescription>
            </Alert>
          </div>

          <div class="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Andere Kontaktwege</CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="flex items-center gap-3">
                  <Icon name="tabler:mail" class="text-muted-foreground" />
                  <div>
                    <p class="font-medium">Email</p>
                    <p class="text-sm text-muted-foreground">{{ supportContact.email }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Icon name="tabler:phone" class="text-muted-foreground" />
                  <div>
                    <p class="font-medium">Telefon</p>
                    <p class="text-sm text-muted-foreground">{{ supportContact.phone }}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <Icon name="tabler:clock" class="h-5 w-5" />
                  Support Zeiten
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div v-for="(hours, day) in supportHours" :key="day" class="flex justify-between">
                  <span class="text-sm capitalize">
                    {{
                      {
                        monday: 'Montag',
                        tuesday: 'Dienstag',
                        wednesday: 'Mittwoch',
                        thursday: 'Donnerstag',
                        friday: 'Freitag',
                        saturday: 'Samstag',
                        sunday: 'Sonntag'
                      }[day]
                    }}
                  </span>
                  <span class="text-sm font-medium">
                    {{ hours ? `${hours.open} - ${hours.close}` : 'Geschlossen' }}
                  </span>
                </div>
                <Separator />
                <div class="flex items-center gap-2">
                  <div v-if="supportOnline" class="w-2 h-2 rounded-full bg-green-500"></div>
                  <div v-else class="w-2 h-2 rounded-full bg-red-500"></div>
                  <span class="text-sm font-medium">{{ supportOnline ? 'Momentan Online' : 'Derzeit Offline' }}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Durchschnittliche Antwortdauer</CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-red-500"></div>
                    <span class="text-sm">Kritisch</span>
                  </div>
                  <Badge variant="destructive">1 Stunde</Badge>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span class="text-sm">Hoch</span>
                  </div>
                  <Badge variant="secondary">4 Stunden</Badge>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span class="text-sm">Mittel</span>
                  </div>
                  <Badge variant="secondary">24 Stunden</Badge>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                    <span class="text-sm">Niedrig</span>
                  </div>
                  <Badge variant="secondary">48 Stunden</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schnelle Hilfe</CardTitle>
                <CardDescription>Fragen und Resourcen</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <Button variant="ghost" class="w-full justify-start cursor-pointer" size="sm">
                  <Icon name="tabler:help-circle" />
                  FAQ & Hilfecenter
                </Button>
                <Button variant="ghost" class="w-full justify-start cursor-pointer" size="sm">
                  <Icon name="tabler:file-text" />
                  Dokumentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <!-- FAQ section -->
      <TabsContent value="faq">
        <div class="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Häufig gestellte Fragen</CardTitle>
              <CardDescription>Finden Sie Antworten auf häufige Fragen zu unserer Plattform</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible class="w-full">
                <AccordionItem v-for="(faq, index) in faqItems" :key="`faq-${index}`" :value="`faq-item-${index}`">
                  <AccordionTrigger class="text-left">
                    <div class="flex items-center">
                      {{ faq.question }}
                      <Badge variant="outline" class="ml-2 text-xs">
                        {{ faq.category }}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p class="text-muted-foreground">{{ faq.answer }}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- documentation section -->
      <TabsContent value="documentation">
        <div class="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Erste Schritte</CardTitle>
              <CardDescription>Wichtige Anleitungen für neue Benutzer</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-3">
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Plattformübersicht</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Anleitung zur Kontoeinrichtung</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Grundlagen der Benutzerverwaltung</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Navigation im Dashboard</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Checkliste für erste Schritte</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
            </CardContent>
            <CardFooter>
              <Button variant="outline" class="w-full">
                Alle Anleitungen anzeigen
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benutzerverwaltung</CardTitle>
              <CardDescription>Erfahren Sie, wie Sie Benutzer effektiv verwalten</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-3">
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Neue Benutzer hinzufügen</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Benutzerrollen & Berechtigungen</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Mehrfachaktionen für Benutzer</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Benutzeraktivitäten überwachen</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Sicherheitsbestimmungen</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
            </CardContent>
            <CardFooter>
              <Button variant="outline" class="w-full">
                Alle Anleitungen anzeigen
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Erweiterte Funktionen</CardTitle>
              <CardDescription>Detaillierte Dokumentation für erfahrene Nutzer</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-3">
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>API-Dokumentation</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Webhooks & Integrationen</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Benutzerdefinierte Berichte</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Automatisierungs-Workflows</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
              <a href="#" class="flex items-center justify-between hover:underline">
                <span>Datenexport & -import</span>
                <Icon name="tabler:external-link" class="h-4 w-4" />
              </a>
            </CardContent>
            <CardFooter>
              <Button variant="outline" class="w-full">
                Alle Anleitungen anzeigen
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card class="mt-6">
          <CardHeader>
            <CardTitle>Video-Tutorials</CardTitle>
            <CardDescription>Lernen Sie mit unseren Schritt-für-Schritt-Videoguides</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-6 md:grid-cols-3">
              <div class="space-y-3">
                <div class="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <Icon name="tabler:file-text" class="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
                <h3 class="font-medium">Erste Schritte mit der Benutzerverwaltung</h3>
                <p class="text-sm text-muted-foreground">
                  Erlernen Sie die Grundlagen zur Verwaltung von Benutzern, Rollen und Berechtigungen.
                </p>
              </div>
              <div class="space-y-3">
                <div class="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <Icon name="tabler:file-text" class="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
                <h3 class="font-medium">Erweiterte Filter- und Suchfunktionen</h3>
                <p class="text-sm text-muted-foreground">
                  Nutzen Sie die Filter- und Suchfunktionen effektiv, um Benutzer schnell zu finden.
                </p>
              </div>
              <div class="space-y-3">
                <div class="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <Icon name="tabler:file-text" class="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
                <h3 class="font-medium">Mehrfachaktionen und Datenexport</h3>
                <p class="text-sm text-muted-foreground">
                  Erfahren Sie, wie Sie Aktionen für mehrere Benutzer durchführen und Daten exportieren.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" class="w-full">
              Alle Tutorials anzeigen
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>


    </Tabs>

  </div>
</template>